import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";
import { getWeekMovies } from "@/lib/movies";

import GenerateurSemaine from "./generateur-semaine";

export const dynamic = "force-dynamic";

export default function GenerateNewsletterPage() {
  const movies = getWeekMovies();

  return (
    <>
      <PageHeader text="El Generator">
        <SousTitre1>Générateur de la Semaine Cinéma</SousTitre1>
      </PageHeader>
      <GenerateurSemaine movies={movies} />
    </>
  );
}
