"use client";

import { useCallback, useState } from "react";

import DateSelector from "@/app/(calendrier)/date-selector";
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
          <div className="flex grow pt-15px lg:pt-0">
            <Filter />
          </div>
        </div>
        {isQuartierSelectorOpen && (
          <div className="hidden lg:flex lg:pt-20px">
            <QuartierSelector />
          </div>
        )}
        <div className="flex grow pt-18px lg:pt-28px">
          <div className="hidden">
            <MovieTable serverMovies={serverMovies} allMovies={allMovies} />
          </div>
          <div className="grow text-center">
            Notre site est actuellement en maintenance.
            <br />
            Veuillez nous excuser pour la gêne occasionnée – et pour les
            informations erronées qui ont pu apparaître sur le site hier !
            <br />
            <br />À très vite !
          </div>
        </div>
      </div>
    </div>
  );
}
