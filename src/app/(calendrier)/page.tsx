"use client";

import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

import DateSelector from "@/app/(calendrier)/date-selector";
import QuartierSelector from "@/app/(calendrier)/quartier-selector";
import TimeSlider from "@/app/(calendrier)/time-slider";
import PageHeader from "@/components/layout/page-header";
import { useUseCalendrierStore } from "@/lib/calendrier-store";

import MovieTable from "./movie-table";
import QuartierSelectorToggler from "./quartier-selector-toggler";
import Search from "./search";

export default function CalendrierPage() {
  const useCalendrierStore = useRef(useUseCalendrierStore());
  const fetchMovies = useCalendrierStore.current((s) => s.fetchMovies);
  useEffect(() => fetchMovies, [fetchMovies]);

  const [isQuartierSelectorOpen, setQuartierSelectorOpen] = useState(false);

  const toggleQuartierSelectorOpen = useCallback(
    () => setQuartierSelectorOpen(!isQuartierSelectorOpen),
    [setQuartierSelectorOpen, isQuartierSelectorOpen],
  );

  return (
    <div className="flex grow flex-col">
      <div className="flex flex-col lg:gap-4">
        <div className="flex">
          <PageHeader text="calendrier" />
        </div>
        <div className="flex border-b border-retro-gray py-3 lg:border-0 lg:py-0">
          <DateSelector useCalendrierStore={useCalendrierStore.current} />
        </div>
      </div>
      <div className="flex flex-col lg:gap-8 lg:pl-4">
        <div className="flex">
          <TimeSlider useCalendrierStore={useCalendrierStore.current} />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col pt-6 lg:flex-row lg:gap-4 lg:pt-0">
            <div className="flex lg:pb-0">
              <QuartierSelectorToggler
                toggleOpen={toggleQuartierSelectorOpen}
                isOpen={isQuartierSelectorOpen}
              />
            </div>
            <div className="flex lg:hidden">
              <QuartierSelector
                isOpen={isQuartierSelectorOpen}
                useCalendrierStore={useCalendrierStore.current}
              />
            </div>
            <div className="flex pb-5 pt-4 lg:grow lg:py-0">
              <Search useCalendrierStore={useCalendrierStore.current} />
            </div>
          </div>
          <div
            className={classNames("hidden lg:flex", {
              "pt-4": isQuartierSelectorOpen,
            })}
          >
            <QuartierSelector
              isOpen={isQuartierSelectorOpen}
              useCalendrierStore={useCalendrierStore.current}
            />
          </div>
        </div>
        <div className="flex">
          <MovieTable useCalendrierStore={useCalendrierStore.current} />
        </div>
      </div>
    </div>
  );
}
