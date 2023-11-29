"use client";

import { useRef } from "react";

import DateSelector from "@/components/date-selector";
import PageHeader from "@/components/page-header";
import TimeSlider from "@/components/time-slider";
import { useUseCalendrierStore } from "@/lib/calendrier-store";

export default function CalendrierPage() {
  const useCalendrierStore = useRef(useUseCalendrierStore());

  return (
    <div className="flex grow flex-col">
      <div className="flex">
        <PageHeader text="calendrier" />
      </div>
      <div className="border-retro-gray flex border-b py-3">
        <DateSelector useCalendrierStore={useCalendrierStore.current} />
      </div>
      <div className="flex pb-6 pt-12">
        <TimeSlider useCalendrierStore={useCalendrierStore.current} />
      </div>
    </div>
  );
}
