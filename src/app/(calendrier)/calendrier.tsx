"use client";

import { useCallback, useState } from "react";

import DateSelector from "@/app/(calendrier)/date-selector";
import QuartierSelector from "@/app/(calendrier)/quartier-selector";
import TimeSlider from "@/app/(calendrier)/time-slider";
import PageHeader from "@/components/layout/page-header";
import { Movie, MovieWithShowtimesByDay } from "@/lib/types";

import MovieTable from "./movie-table";
import QuartierSelectorToggler from "./quartier-selector-toggler";
import Search from "./search";

export default function Calendrier({
  serverMovies,
  allMovies,
  title,
}: {
  serverMovies: Promise<Movie[] | MovieWithShowtimesByDay[]>;
  allMovies?: boolean;
  title?: string;
}) {
  const [isQuartierSelectorOpen, setQuartierSelectorOpen] = useState(false);

  const toggleQuartierSelectorOpen = useCallback(
    () => setQuartierSelectorOpen(!isQuartierSelectorOpen),
    [setQuartierSelectorOpen, isQuartierSelectorOpen],
  );

  return (
    <div className="flex grow flex-col">
      <PageHeader text={title ?? "calendrier"}>
        <div className="flex grow items-center justify-center">
          <DateSelector />
        </div>
      </PageHeader>
      <div className="flex grow flex-col lg:pl-20px">
        <div className="flex pb-23px lg:pb-32px lg:pt-14px">
          <TimeSlider />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex lg:pr-20px">
            <QuartierSelectorToggler
              toggleOpen={toggleQuartierSelectorOpen}
              isOpen={isQuartierSelectorOpen}
            />
          </div>
          {isQuartierSelectorOpen && (
            <div className="flex pt-8px lg:hidden">
              <QuartierSelector />{" "}
            </div>
          )}
          <div className="flex pt-15px lg:grow lg:pt-0">
            <Search />
          </div>
        </div>
        {isQuartierSelectorOpen && (
          <div className="hidden lg:flex lg:pt-20px">
            <QuartierSelector />
          </div>
        )}
        <div className="flex grow pt-18px lg:pt-28px">
          <MovieTable serverMovies={serverMovies} allMovies={allMovies} />
        </div>
      </div>
    </div>
  );
}
