"use client";

import DateSelector from "@/app/(calendrier)/date-selector";
import Filter from "@/app/(calendrier)/filter";
import MovieTable from "@/app/(calendrier)/movie-table";
import TimeSlider from "@/app/(calendrier)/time-slider";
import PageHeader from "@/components/layout/page-header";
import { Movie, MovieWithShowtimesByDay } from "@/lib/types";

export default function MarseilleCalendrier({
  serverMovies,
  allMovies,
  title,
}: {
  serverMovies: Promise<Movie[] | MovieWithShowtimesByDay[]>;
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
        <TimeSlider />
        <div className="flex flex-col lg:flex-row">
          <div className="flex grow pt-15px lg:pt-0">
            <Filter />
          </div>
        </div>
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
