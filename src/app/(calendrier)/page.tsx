"use client";

import { useRef } from "react";

import DateSelector from "@/components/date-selector";
import PageHeader from "@/components/page-header";
import TimeSlider from "@/components/time-slider";
import { useUseCalendrierStore } from "@/lib/calendrier-store";

export default function CalendrierPage() {
  const useCalendrierStore = useRef(useUseCalendrierStore());

  return (
    <div className="grow flex flex-col">
      <div className="flex">
        <PageHeader text="calendrier" />
      </div>
      <div className="flex border-b border-retro-gray py-3">
        <DateSelector useCalendrierStore={useCalendrierStore.current} />
      </div>
      <div className="flex pt-12 pb-6">
        <TimeSlider useCalendrierStore={useCalendrierStore.current} />
      </div>
    </div>
  );
}
