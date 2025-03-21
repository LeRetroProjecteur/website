import { Metadata } from "next";

import { getDayMovies } from "@/lib/movies";
import { getStartOfTodayInParis } from "@/lib/utils";

import Calendrier from "./calendrier";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  description: "Calendrier de toutes les séances de ressorties cinéma à Paris",
};

export default function CalendrierPage() {
  return <Calendrier serverMovies={getDayMovies(getStartOfTodayInParis())} />;
}
