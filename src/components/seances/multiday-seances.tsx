"use client";

import clsx from "clsx";
import { capitalize, orderBy, toPairs } from "lodash-es";
import React from "react";

import Seances from "@/components/seances/seances";
import { BodyCopy } from "@/components/typography/typography";
import { TheaterScreenings } from "@/lib/types";
import { formatMerJJMM, safeDate } from "@/lib/util";

export default function MultiDaySeances({
  screenings,
  className,
  groupClassName,
  hideDate = false,
}: {
  screenings: { [day: string]: TheaterScreenings[] };
  className?: string;
  groupClassName?: string;
  hideDate?: boolean;
}) {
  return (
    <div
      className={clsx(
        "grid-auto-rows grid grid-cols-[auto_1fr] gap-x-20px",
        className,
      )}
    >
      {orderBy(
        toPairs(screenings).map<[string, TheaterScreenings[]]>(
          ([day, screeningsTheaters]) => [day, screeningsTheaters],
        ),
        ([day]) => day,
      ).map(([day, screeningsTheaters]) => (
        <div
          key={day}
          className={clsx(
            "col-span-full grid grid-cols-[subgrid]",
            groupClassName,
          )}
        >
          {!hideDate && (
            <BodyCopy>{capitalize(formatMerJJMM(safeDate(day)))}</BodyCopy>
          )}
          <div className="flex flex-col">
            <Seances screenings={screeningsTheaters} />
          </div>
        </div>
      ))}
    </div>
  );
}
