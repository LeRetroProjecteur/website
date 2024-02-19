import { getWeekMovies } from "@/lib/movies";

import GenerateNewsletter from "./generate-newsletter";

export const dynamic = "force-dynamic";

export default function GenerateNewsletterPage() {
  const movies = getWeekMovies();

  return <GenerateNewsletter movies={movies} />;
}
