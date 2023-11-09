import { sortBy, take } from "lodash-es";
import { NextRequest } from "next/server";

import { getMovies } from "@/lib/movies";
import { checkNotNull } from "@/lib/util";

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const query = checkNotNull(searchParams.get("query")?.toLowerCase());
  const movies = await getMovies();

  const filtered = sortBy(
    movies.filter(
      (movie) =>
        movie.directors.toLowerCase().includes(query) ||
        movie.title.toLowerCase().includes(query),
    ),
    (movie) => movie.title,
  );
  const firstFive = take(filtered, 5);

  return Response.json(firstFive);
}
