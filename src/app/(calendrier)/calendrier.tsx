"use client";

import { MutableRefObject, useCallback, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";

import DateSelector from "@/app/(calendrier)/date-selector";
import QuartierSelector from "@/app/(calendrier)/quartier-selector";
import TimeSlider from "@/app/(calendrier)/time-slider";
import PageHeader from "@/components/layout/page-header";
import { Movie, MovieWithShowtimesByDay } from "@/lib/types";
import { getBreakpoint } from "@/lib/util";

import Filter from "./filter";
import MovieTable from "./movie-table";
import QuartierSelectorToggler from "./quartier-selector-toggler";

export default function Calendrier({
  serverMovies,
  allMovies,
  title,
}: {
  serverMovies: Promise<Movie[] | MovieWithShowtimesByDay[]>;
  allMovies?: boolean;
  title?: string;
}) {
  const togglerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [isQuartierSelectorOpen, setQuartierSelectorOpen] = useState(false);
  const { width } = useWindowSize();

  const toggleQuartierSelectorOpen = useCallback(
    () => setQuartierSelectorOpen(!isQuartierSelectorOpen),
    [setQuartierSelectorOpen, isQuartierSelectorOpen],
  );

  const closeQuartierSelector = useCallback(
    (e: MouseEvent) => {
      const toggler = togglerRef.current;
      if (toggler != null && !toggler.contains(e.target as unknown as Node)) {
        setQuartierSelectorOpen(false);
      }
    },
    [setQuartierSelectorOpen],
  );

  return (
    <div className="flex grow flex-col">
      <PageHeader text={title ?? "calendrier"}>
        <div className="flex grow items-center justify-center">
          <DateSelector />
        </div>
      </PageHeader>
      <div className="flex grow flex-col lg:pl-20px">
        <TimeSlider />
        <div className="flex flex-col lg:flex-row">
          <div className="flex lg:pr-20px">
            <QuartierSelectorToggler
              togglerRef={togglerRef}
              toggleOpen={toggleQuartierSelectorOpen}
              isOpen={isQuartierSelectorOpen}
            />
          </div>
          {isQuartierSelectorOpen && width < getBreakpoint("lg") && (
            <div className="flex pt-8px">
              <QuartierSelector close={closeQuartierSelector} />{" "}
            </div>
          )}
          <div className="flex pt-15px grow lg:pt-0">
            <Filter />
          </div>
        </div>
        {isQuartierSelectorOpen && width >= getBreakpoint("lg") && (
          <div className="flex lg:pt-20px">
            <QuartierSelector close={closeQuartierSelector} />
          </div>
        )}
        <div className="flex grow pt-18px lg:pt-28px">
          <MovieTable serverMovies={serverMovies} allMovies={allMovies} />
        </div>
      </div>
    </div>
  );
}
