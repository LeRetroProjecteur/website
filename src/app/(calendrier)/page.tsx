"use client";

import { useEffect, useRef } from "react";

import DateSelector from "@/app/(calendrier)/date-selector";
import QuartierSelector from "@/app/(calendrier)/quartier-selector";
import TimeSlider from "@/app/(calendrier)/time-slider";
import PageHeader from "@/components/layout/page-header";
import { useUseCalendrierStore } from "@/lib/calendrier-store";

import MovieTable from "./movie-table";
import Search from "./search";

export default function CalendrierPage() {
  const useCalendrierStore = useRef(useUseCalendrierStore());
  const fetchMovies = useCalendrierStore.current((s) => s.fetchMovies);
  useEffect(() => fetchMovies, [fetchMovies]);

  return (
    <div className="flex grow flex-col">
      <div className="flex">
        <PageHeader text="calendrier" />
      </div>
      <div className="flex border-b border-retro-gray py-3">
        <DateSelector useCalendrierStore={useCalendrierStore.current} />
      </div>
      <div className="flex">
        <TimeSlider useCalendrierStore={useCalendrierStore.current} />
      </div>
      <div className="flex pb-4 pt-6">
        <QuartierSelector useCalendrierStore={useCalendrierStore.current} />
      </div>
      <div className="flex pb-5">
        <Search useCalendrierStore={useCalendrierStore.current} />
      </div>
      <div className="flex">
        <MovieTable useCalendrierStore={useCalendrierStore.current} />
      </div>
    </div>
  );
}
