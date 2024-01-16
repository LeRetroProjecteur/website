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
        <div className="flex lg:pb-20px">
          <PageHeader text="calendrier" />
        </div>
        <div className="flex border-b lg:border-0">
          <DateSelector />
        </div>
      </FixedHeader>
      <div className="flex flex-col pb-10px lg:pl-20px">
        <div className="flex pb-23px pt-14px lg:pb-32px lg:pt-14px">
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
        <div className="flex pt-18px lg:pt-28px">
          <MovieTable serverMovies={serverMovies} />
        </div>
      </div>
    </div>
  );
}
