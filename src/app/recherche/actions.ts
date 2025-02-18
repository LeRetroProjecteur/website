"use server";

import _ from "lodash";

import { getSearchMovies } from "@/lib/movies";
import { stringMatch } from "@/lib/util";

export async function search({
  searchTerm,
  nbResults,
}: {
  searchTerm: string;
  nbResults: number;
}) {
  const searchMovies = await getSearchMovies();
  return searchTerm.length > 0
    ? _(searchMovies)
        .filter(([_, fields]) => stringMatch(searchTerm, fields))
        .map(([elem]) => elem)
        .take(nbResults)
        .value()
    : [];
}
