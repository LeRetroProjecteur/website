"use client";

import { useCallback, useState } from "react";

import DateSelector from "@/app/(calendrier)/date-selector";
import Events from "@/app/(calendrier)/events";
import QuartierSelector from "@/app/(calendrier)/quartier-selector";
import TimeSlider from "@/app/(calendrier)/time-slider";
import PageHeader from "@/components/layout/page-header";
import { MovieWithScreenings, MovieWithScreeningsByDay } from "@/lib/types";

import Filter from "./filter";
import MovieTable from "./movie-table";
import QuartierSelectorToggler from "./quartier-selector-toggler";

export default function Calendrier({
  serverMovies,
  allMovies,
  title,
}: {
  serverMovies: Promise<MovieWithScreenings[] | MovieWithScreeningsByDay[]>;
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
      <PageHeader text={title ?? "calendrier"} className="group/date">
        <div className="flex grow items-center justify-center">
          <DateSelector />
        </div>
      </PageHeader>
      <div className="flex grow flex-col lg:pl-20px">
        <TimeSlider />
        <div className="hidden lg:flex lg:flex-row lg:flex-col">
          <div className="flex grow flex-row gap-x-20px">
            <div className="flex w-240px">
              <QuartierSelectorToggler
                toggleOpen={toggleQuartierSelectorOpen}
                isOpen={isQuartierSelectorOpen}
              />
            </div>
            <div className="flex w-240px">
              <Events />
            </div>
            <div className="flex grow">
              <Filter />
            </div>
          </div>
          {isQuartierSelectorOpen && (
            <div className="pt-20px">
              <QuartierSelector />
            </div>
          )}
        </div>
        <div className="lg:hidden">
          <div className="grid grow grid-cols-[repeat(auto-fill,_minmax(40%,_1fr))] gap-x-15px">
            <div className="flex">
              <QuartierSelectorToggler
                toggleOpen={toggleQuartierSelectorOpen}
                isOpen={isQuartierSelectorOpen}
              />
            </div>
            <div className="flex">
              <Events />
            </div>
          </div>
          {isQuartierSelectorOpen && (
            <div className="flex pt-8px">
              <QuartierSelector />{" "}
            </div>
          )}
          <div className="flex grow pt-15px">
            <Filter />
          </div>
        </div>
        <div className="flex grow pt-18px lg:pt-28px">
          <MovieTable serverMovies={serverMovies} allMovies={allMovies} />
        </div>
      </div>
    </div>
  );
}
