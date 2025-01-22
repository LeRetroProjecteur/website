"use server";

import _ from "lodash";

import { getSearchMovies } from "@/lib/movies";
import { getFields, stringMatchFields } from "@/lib/util";

export async function search({
  searchTerm,
  nbResults,
}: {
  searchTerm: string;
  nbResults: number;
}) {
  const searchMovies = await getSearchMovies();
  const keywords = getFields(searchTerm);

  return searchTerm.length > 0
    ? _(searchMovies)
        .filter(([_, fields]) => stringMatchFields(keywords, fields))
        .map(([elem]) => elem)
        .take(nbResults)
        .value()
    : [];
}
