import { getDayMovies } from "@/lib/movies";
import { getStartOfTodayInParis } from "@/lib/utils";

import MarseilleCalendrier from "./marseille";

export const dynamic = "force-dynamic";

export default function CalendrierPageMarseille() {
  return (
    <MarseilleCalendrier
      serverMovies={getDayMovies(getStartOfTodayInParis(), {
        collectionBase: "website-by-date-screenings-marseille",
      })}
    />
  );
}
