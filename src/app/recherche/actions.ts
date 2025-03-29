"use server";

import { getSearchMovies } from "@/lib/movies";
import { getTheaters } from "@/lib/theaters";
import { isSearchMatch } from "@/lib/utils";

export async function searchMovies({
  query,
  nbResults,
}: {
  query: string;
  nbResults: number;
}) {
  const searchMovies = await getSearchMovies();
  return query.length > 0
    ? searchMovies
        .filter(([_, record]) => isSearchMatch(query, record))
        .map(([movie]) => movie)
        .slice(0, nbResults)
    : [];
}

export async function searchTheaters({
  query,
  nbResults,
}: {
  query: string;
  nbResults: number;
}) {
  const searchTheaters = await getTheaters();
  return query.length > 0
    ? searchTheaters
        .filter((theater) => isSearchMatch(query, theater.name))
        .slice(0, nbResults)
    : [];
}
