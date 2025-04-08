"use server";

import { getTheaters } from "@/lib/theaters";
import { isSearchMatch } from "@/lib/utils";

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
