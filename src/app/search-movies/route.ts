import { take } from "lodash-es";
import { NextRequest } from "next/server";

import { getMovies } from "@/lib/movies";
import { checkNotNull } from "@/lib/util";

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const query = checkNotNull(searchParams.get("query")?.toLowerCase());
  const movies = await getMovies();

  const filtered = movies.filter(
    (movie) =>
      movie.directors.toLowerCase().includes(query) ||
      movie.title.toLowerCase().includes(query),
  );
  const firstFive = take(filtered, 5);

  // TODO: sort?

  return Response.json(firstFive);
}
