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
    <>
      <div
        onClick={onClickLeft}
        className="flex grow cursor-pointer justify-end pr-5px"
      >
        <LeftArrow />
      </div>
      <div>
        <SousTitre1>{formatLundi1Janvier(date)}</SousTitre1>
      </div>
      <div
        onClick={onClickRight}
        className="flex grow cursor-pointer justify-start pl-5px"
      >
        <RightArrow />
      </div>
    </>
  );
}
