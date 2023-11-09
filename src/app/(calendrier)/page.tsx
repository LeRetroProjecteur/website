import { format, startOfDay } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import { MoviesByDay } from "@/components/movies";
import { getDayMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export default function Calendrier() {
  const date = startOfDay(utcToZonedTime(new Date(), "Europe/Paris"));
  const movies = getDayMovies(date);

  return <MoviesByDay date={format(date, "y-MM-dd")} movies={movies} />;
}
