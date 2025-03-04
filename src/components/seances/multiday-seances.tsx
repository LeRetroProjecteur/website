"use client";

import clsx from "clsx";
import { capitalize, orderBy, toPairs } from "lodash-es";
import React from "react";

import Seances from "@/components/seances/seances";
import { BodyCopy } from "@/components/typography/typography";
import { TheaterScreenings } from "@/lib/types";
import { formatMerJJMM, safeDate } from "@/lib/utils";

import { DialogMovie } from "../seance-dialog/seance-dialog";

export default function MultiDaySeances({
  movie,
  screenings,
  className,
  groupClassName,
  hideDate = false,
  title,
}: {
  movie: DialogMovie;
  screenings: { [day: string]: TheaterScreenings[] };
  className?: string;
  groupClassName?: string;
  hideDate?: boolean;
  title?: string;
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
          {title && <div className="uppercase italic">{title}</div>}
          {!hideDate && (
            <BodyCopy>{capitalize(formatMerJJMM(safeDate(day)))}</BodyCopy>
          )}
          <div className="flex flex-col">
            <Seances day={day} screenings={screeningsTheaters} movie={movie} />
          </div>
        </div>
      ))}
    </div>
  );
}
