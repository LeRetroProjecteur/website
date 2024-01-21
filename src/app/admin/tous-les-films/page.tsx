import { getDayMovies } from "@/lib/movies";
import { getStartOfTodayInParis } from "@/lib/util";

import Calendrier from "../../(calendrier)/calendrier";

export const dynamic = "force-static";
export const revalidate = 1;

export default function TousLesFilmsPage() {
  return (
    <Calendrier
      serverMovies={getDayMovies(getStartOfTodayInParis(), { allMovies: true })}
      allMovies={true}
    />
  );
}
