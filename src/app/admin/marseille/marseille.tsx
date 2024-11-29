"use client";

import CalendarFilters from "@/app/(calendrier)/calendar-filters";
import DateSelector from "@/app/(calendrier)/date-selector";
import MovieTable from "@/app/(calendrier)/movie-table";
import PageHeader from "@/components/layout/page-header";
import { MovieWithScreenings, MovieWithScreeningsByDay } from "@/lib/types";

export default function MarseilleCalendrier({
  serverMovies,
  allMovies,
  title,
}: {
  serverMovies: Promise<MovieWithScreenings[] | MovieWithScreeningsByDay[]>;
  allMovies?: boolean;
  title?: string;
}) {
  return (
    <div className="flex grow flex-col">
      <PageHeader text={title ?? "marseille"} className="group/date">
        <div className="flex grow items-center justify-center">
          <DateSelector />
        </div>
      </PageHeader>
      <div className="flex grow flex-col lg:pl-20px">
        <CalendarFilters withQuartierSelector={false} />
        <div className="flex grow pt-18px lg:pt-28px">
          <MovieTable
            serverMovies={serverMovies}
            allMovies={allMovies}
            marseille={true}
          />
        </div>
      </div>
    </div>
  );
}
