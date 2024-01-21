import Search from "@/app/(calendrier)/search";
import FixedHeader from "@/components/layout/fixed-header";
import PageHeader from "@/components/layout/page-header";
import { getWeekMovies } from "@/lib/movies";

import MovieTable from "../../(calendrier)/movie-table";

export const dynamic = "force-static";
export const revalidate = 1;

export default function SemainePage() {
  const serverMovies = getWeekMovies();

  return (
    <div className="flex grow flex-col">
      <FixedHeader className="flex flex-col">
        <div className="flex lg:pb-20px">
          <PageHeader text="semaine" />
        </div>
      </FixedHeader>
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
    </div>
  );
}
