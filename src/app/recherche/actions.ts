"use server";

import { take } from "lodash-es";

import { getSearchMovies } from "@/lib/movies";
import { getFields, stringMatchFields } from "@/lib/util";

export async function search({
  searchTerm,
  nbResults,
}: {
  searchTerm: string;
  nbResults: number;
}) {
  "use server";
  const searchMovies = await getSearchMovies();
  const keywords = getFields(searchTerm);

  return searchTerm.length > 0
    ? take(
        searchMovies
          .filter(([_, fields]) => stringMatchFields(keywords, fields))
          .map(([elem]) => elem),
        nbResults,
      )
    : [];
}
