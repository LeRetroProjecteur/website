"use server";

import _ from "lodash";

import { getSearchMovies } from "@/lib/movies";
import { getTheaters } from "@/lib/theaters";
import { isSearchMatch } from "@/lib/util";

export async function searchMovies({
  query,
  nbResults,
}: {
  query: string;
  nbResults: number;
}) {
  const searchMovies = await getSearchMovies();
  return query.length > 0
    ? _(searchMovies)
        .filter(([_, record]) => isSearchMatch(query, record))
        .map(([elem]) => elem)
        .take(nbResults)
        .value()
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
    ? _(searchTheaters)
        .filter((theater) => isSearchMatch(query, theater.name))
        .take(nbResults)
        .value()
    : [];
}
