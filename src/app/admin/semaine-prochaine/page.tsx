import Search from "@/app/(calendrier)/search";
import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";
import { getWeekMovies } from "@/lib/movies";
import { formatLundi1Janvier, getNextMovieWeek } from "@/lib/util";

import MovieTable from "../../(calendrier)/movie-table";

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
        <div className="flex flex-col lg:flex-row">
          <div className="flex pt-15px lg:grow lg:pt-0">
            <Search />
          </div>
        </div>
        <div className="flex grow pt-18px lg:pt-28px">
          <MovieTable serverMovies={serverMovies} allMovies={false} />
        </div>
      </div>
    </>
  );
}
