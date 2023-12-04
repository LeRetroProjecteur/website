"use client";

import { useCallback, useState } from "react";

import DateSelector from "@/app/(calendrier)/date-selector";
import QuartierSelector from "@/app/(calendrier)/quartier-selector";
import TimeSlider from "@/app/(calendrier)/time-slider";
import PageHeader from "@/components/layout/page-header";
import { Movie } from "@/lib/types";

import MovieTable from "./movie-table";
import QuartierSelectorToggler from "./quartier-selector-toggler";
import Search from "./search";

export default function Calendrier({
  serverMovies,
}: {
  serverMovies: Movie[];
}) {
  const [isQuartierSelectorOpen, setQuartierSelectorOpen] = useState(false);

  const toggleQuartierSelectorOpen = useCallback(
    () => setQuartierSelectorOpen(!isQuartierSelectorOpen),
    [setQuartierSelectorOpen, isQuartierSelectorOpen],
  );

  return (
    <div className="flex grow flex-col">
      <div className="flex flex-col">
        <div className="flex lg:pb-4">
          <PageHeader text="calendrier" />
        </div>
        <div className="flex border-b py-3 lg:border-0 lg:py-0">
          <DateSelector />
        </div>
      </div>
      <div className="flex flex-col lg:pl-4">
        <div className="flex pb-6 lg:pb-8">
          <TimeSlider />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex lg:pr-4">
            <QuartierSelectorToggler
              toggleOpen={toggleQuartierSelectorOpen}
              isOpen={isQuartierSelectorOpen}
            />
          </div>
          {isQuartierSelectorOpen && (
            <div className="flex pt-2 lg:hidden">
              <QuartierSelector />{" "}
            </div>
          )}
          <div className="flex pt-4 lg:grow lg:pt-0">
            <Search />
          </div>
        </div>
        {isQuartierSelectorOpen && (
          <div className="hidden pt-5 lg:flex">
            <QuartierSelector />
          </div>
        )}
        <div className="flex pt-5 lg:pt-8">
          <MovieTable serverMovies={serverMovies} />
        </div>
      </div>
    </div>
  );
}
