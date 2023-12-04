"use client";

import { useCallback } from "react";

import { addDays, subDays } from "date-fns";

import { LeftArrow, RightArrow } from "@/components/icons/arrows";
import { useCalendrierStore } from "@/lib/calendrier-store";
import { formatLundi1Janvier } from "@/lib/util";

export default function DateSelector() {
  const date = useCalendrierStore((s) => s.date);
  const setDate = useCalendrierStore((s) => s.setDate);

  const onClickLeft = useCallback(() => {
    setDate(subDays(date, 1));
  }, [date, setDate]);

  const onClickRight = useCallback(() => {
    setDate(addDays(date, 1));
  }, [date, setDate]);

  return (
    <div className="flex grow items-center justify-center lg:border-y lg:bg-retro-green lg:py-4">
      <LeftArrow onClick={onClickLeft} />
      <div className="px-2 text-xl/6 font-semibold uppercase text-retro-gray lg:text-3xl/6">
        {formatLundi1Janvier(date)}
      </div>
      <RightArrow onClick={onClickRight} />
    </div>
  );
}
