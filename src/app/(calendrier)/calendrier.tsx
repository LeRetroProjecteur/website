"use client";

import { useCallback, useState } from "react";

import DateSelector from "@/app/(calendrier)/date-selector";
import QuartierSelector from "@/app/(calendrier)/quartier-selector";
import TimeSlider from "@/app/(calendrier)/time-slider";
import FixedHeader from "@/components/layout/fixed-header";
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
      <FixedHeader className="flex flex-col">
        <div className="lg:pb-20px flex">
          <PageHeader text="calendrier" />
        </div>
        <div className="flex border-b lg:border-0">
          <DateSelector />
        </div>
      </FixedHeader>
      <div className="lg:pl-20px pb-10px flex flex-col">
        <div className="lg:pb-32px lg:pt-19px pt-14px pb-23px flex">
          <TimeSlider />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:pr-20px flex">
            <QuartierSelectorToggler
              toggleOpen={toggleQuartierSelectorOpen}
              isOpen={isQuartierSelectorOpen}
            />
          </div>
          {isQuartierSelectorOpen && (
            <div className="pt-8px flex lg:hidden">
              <QuartierSelector />{" "}
            </div>
          )}
          <div className="pt-15px flex lg:grow lg:pt-0">
            <Search />
          </div>
        </div>
        {isQuartierSelectorOpen && (
          <div className="lg:pt-20px hidden lg:flex">
            <QuartierSelector />
          </div>
        )}
        <div className="lg:pt-28px pt-18px flex">
          <MovieTable serverMovies={serverMovies} />
        </div>
      </div>
    </div>
  );
}
