import { MoviesByDayClient } from "@/components/movies";
import { Movie, getDayMovies } from "@/lib/movies";
import { startOfDay } from "date-fns";

export const dynamic = "force-dynamic";

export default function MoviesByDay() {
  const date = startOfDay(new Date());
  const movies = getDayMovies(date);

  return <MoviesByDayClient date={date} movies={movies} />;
}
