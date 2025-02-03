"use client";

import DateSelector from "@/app/(calendrier)/date-selector";
import PageHeader from "@/components/layout/page-header";
import { MovieWithScreeningsOneDay } from "@/lib/types";

import CalendarFilters from "./calendar-filters";
import MovieTable from "./movie-table";

export default function Calendrier({
  serverMovies,
  allMovies,
  title,
}: {
  serverMovies: Promise<MovieWithScreeningsOneDay[]>;
  allMovies?: boolean;
  title?: string;
}) {
  return (
    <>
      <PageHeader text={title ?? "calendrier"} className="group/date">
        <div className="flex grow items-center justify-center">
          <DateSelector />
        </div>
      </PageHeader>
      <div className="flex grow flex-col lg:pl-20px">
        <CalendarFilters />
        <div className="flex grow pt-18px lg:pt-28px">
          <MovieTable serverMovies={serverMovies} allMovies={allMovies} />
        </div>
      </div>
    </>
  );
}
