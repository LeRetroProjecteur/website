import { getDayMoviesMarseille } from "@/lib/movies";
import { getStartOfTodayInParis } from "@/lib/util";

import MarseilleCalendrier from "./marseille";

export const dynamic = "force-dynamic";

export default function CalendrierPage() {
  return (
    <MarseilleCalendrier
      serverMovies={getDayMoviesMarseille(getStartOfTodayInParis())}
    />
  );
}
