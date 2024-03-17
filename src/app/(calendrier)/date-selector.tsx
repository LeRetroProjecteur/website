"use client";

import clsx from "clsx";
import { useCallback } from "react";

import { LeftArrow, RightArrow } from "@/components/icons/arrows";
import { SousTitre1 } from "@/components/typography/typography";
import { useCalendrierStore } from "@/lib/calendrier-store";
import { formatLundi1Janvier, getStartOfTodayInParis } from "@/lib/util";

export default function DateSelector() {
  const date = useCalendrierStore((s) => s.date);
  const setDate = useCalendrierStore((s) => s.setDate);

  const onClickLeft = useCallback(() => {
    setDate(date.minus({ days: 1 }));
  }, [date, setDate]);

  const onClickRight = useCallback(() => {
    setDate(date.plus({ days: 1 }));
  }, [date, setDate]);

  const today = getStartOfTodayInParis(); // A
  const canGoBackInTime = date > today; // C

  return (
    <div className="flex grow items-center justify-center">
      <div
        onClick={onClickLeft}
        className={clsx("flex grow cursor-pointer justify-end", {
          invisible: !canGoBackInTime,
        })}
      >
        <div className="rounded-sm border border-[#00000000] p-5px pr-3px group-hover/date:border-retro-gray">
          <LeftArrow />
        </div>
      </div>
      <div className="flex items-center">
        <SousTitre1 className="min-w-270px text-center lg:min-w-370px">
          {formatLundi1Janvier(date)}
        </SousTitre1>
      </div>
      <div
        onClick={onClickRight}
        className="flex grow cursor-pointer justify-start"
      >
        <div className="rounded-sm border border-[#00000000] p-5px pl-3px group-hover/date:border-retro-gray">
          <RightArrow />
        </div>
      </div>
    </div>
  );
}
