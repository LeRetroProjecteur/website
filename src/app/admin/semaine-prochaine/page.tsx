import {
  CalendrierSemaineProchaine,
  Retrospectives,
} from "@/app/admin/semaine-prochaine/semaine-prochaine";
import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";
import { getWeekMovies } from "@/lib/movies";
import { formatLundi1Janvier, getNextMovieWeek } from "@/lib/util";

export const dynamic = "force-dynamic";

export default function SemainePage() {
  const movieWeek = getNextMovieWeek();
  const movieWeekStart = formatLundi1Janvier(movieWeek[0]);
  const movieWeekEnd = formatLundi1Janvier(movieWeek[6]);
  const serverMovies = getWeekMovies();

  return (
    <>
      <PageHeader text="La semaine prochaine">
        <SousTitre1>
          Semaine du {movieWeekStart} au {movieWeekEnd}
        </SousTitre1>
      </PageHeader>
      <div className="flex grow flex-col pb-10px lg:pl-20px">
        <CalendrierSemaineProchaine serverMovies={serverMovies} />
        <div className="flex grow flex-col">
          <div className="flex flex-col pt-44px">
            <Retrospectives movies={serverMovies} />
          </div>
        </div>
      </div>
    </>
  );
}
