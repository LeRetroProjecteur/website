"use client";

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
    <>
      {canGoBackInTime ? (
        <div
          onClick={onClickLeft}
          className="flex grow cursor-pointer justify-end pr-5px"
        >
          <LeftArrow />
        </div>
      ) : (
        <div className="flex grow justify-end pr-5px" />
      )}
      <div>
        <SousTitre1 className={canGoBackInTime ? "ml-5px" : ""}>
          {formatLundi1Janvier(date)}
        </SousTitre1>
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
