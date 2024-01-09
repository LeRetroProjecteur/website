"use client";

import { useCallback } from "react";

import { addDays, subDays } from "date-fns";

import { LeftArrow, RightArrow } from "@/components/icons/arrows";
import { SousTitre1 } from "@/components/typography/typography";
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
    <div className="flex grow items-center justify-center lg:border-y lg:bg-retro-green lg:py-14px">
      <LeftArrow onClick={onClickLeft} />
      <div className="px-10px">
        <SousTitre1>{formatLundi1Janvier(date)}</SousTitre1>
      </div>
      <RightArrow onClick={onClickRight} />
    </div>
  );
}
