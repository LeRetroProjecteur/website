"use server";

import _ from "lodash";

import { searchInDb } from "@/lib/search-db";

export async function search({
  searchTerm,
  nbResults,
}: {
  searchTerm: string;
  nbResults: number;
}) {
  "use server";
  return searchInDb(searchTerm, nbResults);
}
