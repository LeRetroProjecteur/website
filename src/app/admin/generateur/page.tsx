import { getWeekMovies } from "@/lib/movies";

import GenerateurSemaine from "./generateur-semaine";

export const dynamic = "force-dynamic";

export default function GenerateNewsletterPage() {
  const movies = getWeekMovies();

  return <GenerateurSemaine movies={movies} />;
}
