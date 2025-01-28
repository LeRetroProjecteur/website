"use client";

import clsx from "clsx";
import { min, sortBy, take } from "lodash-es";
import { useCallback, useMemo, useState } from "react";
import React from "react";

import { transformZipcode } from "@/components/theaters/theaters";
import { TheaterScreenings } from "@/lib/types";
import { floatHourToString, safeDate } from "@/lib/util";

import { useSeanceDialogStore } from "../seance-dialog/seance-dialog";
import { CalendrierCopy } from "../typography/typography";

export default function Seances({
  title,
  day,
  screenings,
}: {
  title: string;
  day: string;
  screenings: TheaterScreenings[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(
    () => setIsExpanded(!isExpanded),
    [isExpanded, setIsExpanded],
  );

  const sortedTheaters = useMemo(
    () =>
      sortBy(screenings, [
        function (screeningsTheaters) {
          return min(
            Object.values(screeningsTheaters.seances).map(
              (screening) => screening.time,
            ),
          );
        },
      ]),
    [screenings],
  );

  const unexpandedTheaters = useMemo(
    () => take(sortedTheaters, 3),
    [sortedTheaters],
  );

  const needsExpanding = sortedTheaters.length !== unexpandedTheaters.length;

  return (
    <div
      className={clsx(
        "lg:grid-auto-rows flex grow flex-col gap-y-10px lg:grid lg:grid-cols-[1fr,128px] lg:gap-x-20px lg:gap-y-5px xl:grid-cols-[1fr,180px]",
      )}
    >
      {(isExpanded ? sortedTheaters : unexpandedTheaters).map((theater) => (
        <SeancesTheater
          day={day}
          title={title}
          showtimesTheater={theater}
          key={theater.name}
          isExpanded={isExpanded}
        />
      ))}
      {needsExpanding && (
        <>
          <div></div>
          <div
            className={clsx("flex justify-end lg:justify-start", {
              "cursor-pointer": needsExpanding,
            })}
            onClick={toggleExpanded}
          >
            <CalendrierCopy className="font-semibold">
              {isExpanded ? "Voir moins ↑" : "Voir plus ↓"}
            </CalendrierCopy>
          </div>
        </>
      )}
    </div>
  );
}

export function FormatNotes({
  notes,
  maxLength,
}: {
  notes: string;
  maxLength: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(
    () => setIsExpanded(!isExpanded),
    [isExpanded, setIsExpanded],
  );
  const needsExpanding = notes.length > maxLength;

  return (
    <>
      {needsExpanding ? (
        <span
          className="-mx-2 -my-1 cursor-pointer px-2 py-1"
          onClick={toggleExpanded}
        >
          {isExpanded
            ? notes
            : notes.substring(
                0,
                notes.substring(0, maxLength).lastIndexOf(" ") + 1,
              ) + "[...]"}
        </span>
      ) : (
        notes
      )}
    </>
  );
}

function SeancesTheater({
  title,
  day,
  showtimesTheater,
  isExpanded,
}: {
  title: string;
  day: string;
  showtimesTheater: TheaterScreenings;
  isExpanded: boolean;
}) {
  const screenings = sortBy(
    Object.values(showtimesTheater.seances),
    (screening) => screening.time,
  );

  const setSeance = useSeanceDialogStore((s) => s.setSeance);
  const showDialog = ({ time }: { time: number }) => {
    const date = safeDate(day).set({
      hour: Math.floor(time),
      minute: Number((60 * (time - Math.floor(time))).toPrecision(2)),
    });
    setSeance({
      movieDate: date,
      movieTheater: showtimesTheater.name,
      movieTitle: title,
    });
  };

  return (
    <div
      className="group/cinema flex items-start justify-between lg:col-span-full lg:grid lg:grid-cols-[subgrid]"
      key={showtimesTheater.name}
    >
      <div className="grow pr-10px lg:pr-0px">
        <CalendrierCopy
          className={clsx({ "group-hover/cinema:underline": isExpanded })}
        >
          {showtimesTheater.name} ({transformZipcode(showtimesTheater.zipcode)})
        </CalendrierCopy>
      </div>
      <div className="flex flex-col lg:flex-row lg:flex-wrap lg:self-start">
        {screenings.map((screening, i) => (
          <span
            key={screening.time}
            className={clsx("justify-end", {
              "group-hover/cinema:underline": isExpanded,
            })}
          >
            <CalendrierCopy className="text-right lg:text-left">
              <button onClick={() => showDialog({ time: screening.time })}>
                {floatHourToString(screening.time)}
              </button>
              {screening.notes != null && (
                <span className="text-retro-gray">
                  &nbsp;
                  <span className="hidden lg:inline">
                    <FormatNotes notes={screening.notes} maxLength={50} />
                  </span>
                  <span className="lg:hidden">
                    <FormatNotes notes={screening.notes} maxLength={0} />
                  </span>
                </span>
              )}
              {i < screenings.length - 1 && (
                <span className="hidden lg:inline">&nbsp;•&nbsp;</span>
              )}
            </CalendrierCopy>
          </span>
        ))}
      </div>
    </div>
  );
}
