import { getDayMovies } from "@/lib/movies";
import { getStartOfTodayInParis } from "@/lib/utils";

import Calendrier from "../../(calendrier)/calendrier";

export const dynamic = "force-dynamic";

export default function TousLesFilmsPage() {
  return (
    <Calendrier
      title="Tous les films"
      serverMovies={getDayMovies(getStartOfTodayInParis(), { allMovies: true })}
      allMovies={true}
    />
  );
}
