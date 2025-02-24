"use server";

import _ from "lodash";

import { getSearchMovies } from "@/lib/movies";
import { isSearchMatch } from "@/lib/util";

export async function search({
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
