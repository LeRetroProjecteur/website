import { startOfDay } from "date-fns";

import { MoviesByDay } from "@/components/movies";
import { getDayMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export default function Calendrier() {
  const date = startOfDay(new Date());
  const movies = getDayMovies(date);

  return <MoviesByDay date={date} movies={movies} />;
}
