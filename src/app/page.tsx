import { startOfDay } from "date-fns";

import { MoviesByDayClient } from "@/components/movies";
import { getDayMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export default function MoviesByDay() {
  const date = startOfDay(new Date());
  const movies = getDayMovies(date);

  return <MoviesByDayClient date={date} movies={movies} />;
}
