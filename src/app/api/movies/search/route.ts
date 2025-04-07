import { NextRequest } from "next/server";
import { z } from "zod";

import { getSearchMovies } from "@/lib/movies";
import { isSearchMatch } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { query, nbResults } = z
    .object({ query: z.string(), nbResults: z.coerce.number() })
    .parse(Object.fromEntries(request.nextUrl.searchParams.entries()));

  const searchMovies = await getSearchMovies();
  return Response.json(
    query.length > 0
      ? searchMovies
          .filter(([_, record]) => isSearchMatch(query, record))
          .map(([movie]) => movie)
          .slice(0, nbResults)
      : [],
  );
}
