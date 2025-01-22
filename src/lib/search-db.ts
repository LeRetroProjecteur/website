import SQLite from "better-sqlite3";
import { Insertable, sql } from "kysely";
import { Kysely, SqliteDialect } from "kysely";

import { getSearchMoviesIterator } from "./movies";
import { SearchMovie } from "./types";
import { checkNotNull, getFields, getMovieInfoString } from "./util";

interface Database {
  search: SearchTable;
  last_updated: LastUpdatedTable;
}

interface SearchTable {
  movie: string;
  keywords: string;
  relevance_score: number;
}

interface LastUpdatedTable {
  last_updated: number;
}

const dialect = new SqliteDialect({
  database: new SQLite(checkNotNull(process.env.DB_PATH)),
});

const db = new Kysely<Database>({
  log: ["query", "error"],
  dialect,
});

setInterval(insertSearchMoviesIfStale, 1000 * 60 * 4);

export async function searchInDb(searchTerm: string, nbResults: number) {
  await insertSearchMoviesIfStale();
  const keywords = getFields(searchTerm);
  const results = (
    await db
      .selectFrom("search")
      .select("movie")
      .where((eb) =>
        eb.and(
          keywords.map((keyword) =>
            eb.exists(sql`
          (SELECT 1
          FROM json_each("keywords")
          WHERE value LIKE ${keyword + "%"})`),
          ),
        ),
      )
      .orderBy("relevance_score", "desc")
      .limit(nbResults)
      .execute()
  ).map((row) => JSON.parse(row.movie) as SearchMovie);

  return results;
}

async function insertSearchMoviesIfStale() {
  await db.schema
    .createTable("search")
    .ifNotExists()
    .addColumn("movie", "json")
    .addColumn("keywords", "json")
    .addColumn("relevance_score", "integer")
    .execute();
  await db.schema
    .createTable("last_updated")
    .ifNotExists()
    .addColumn("last_updated", "integer")
    .execute();

  await db.transaction().execute(async (trx) => {
    const lastUpated =
      (
        await trx
          .selectFrom("last_updated")
          .select("last_updated")
          .executeTakeFirst()
      )?.last_updated ?? 0;

    if (lastUpated > new Date().getTime() - 1000 * 60 * 5) {
      return;
    }

    const getNextPage = await getSearchMoviesIterator();
    await trx.deleteFrom("search").execute();
    while (true) {
      const movies = await getNextPage();
      if (movies.length === 0) {
        break;
      }
      await trx
        .insertInto("search")
        .values(
          movies.map<Insertable<SearchTable>>((movie) => ({
            movie: JSON.stringify(movie),
            keywords: JSON.stringify(getFields(getMovieInfoString(movie))),
            relevance_score: movie.relevance_score,
          })),
        )
        .execute();
    }
    await trx.deleteFrom("last_updated").execute();
    await trx
      .insertInto("last_updated")
      .values([{ last_updated: new Date().getTime() }])
      .execute();
  });
}
