"use client";

import clsx from "clsx";
import { min, sortBy, take } from "lodash-es";
import { useCallback, useEffect, useMemo, useState } from "react";
import React from "react";

import {
  transformZipcode,
  transformZipcodeToString,
} from "@/components/theaters/theaters";
import { TheaterScreenings } from "@/lib/types";
import { useHash } from "@/lib/useHash";
import { floatHourToString, safeDate } from "@/lib/utils";

import { useBeta } from "../beta/beta-context";
import {
  DialogMovie,
  hashSeance,
  useSeanceDialogStore,
} from "../seance-dialog/seance-dialog";
import { CalendrierCopy } from "../typography/typography";

function getSortedTheaters(screenings: TheaterScreenings[]) {
  return sortBy(screenings, (theater) =>
    min(Object.values(theater.seances).map((s) => s.time)),
  ).map((theater) => ({
    ...theater,
    seances: Object.fromEntries(
      Object.entries(theater.seances).sort(([, a], [, b]) => a.time - b.time),
    ),
  }));
}

export default function Seances({
  movie,
  day,
  screenings,
}: {
  movie: DialogMovie;
  day: string;
  screenings: TheaterScreenings[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(
    () => setIsExpanded(!isExpanded),
    [isExpanded, setIsExpanded],
  );

  const sortedTheaters = useMemo(
    () => getSortedTheaters(screenings),
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
          movie={movie}
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
  const expandedClassName = maxLength === 0 && isExpanded ? "block" : "";

  // Function to handle specific word formatting
  const formatNotes = (text: string) => {
    if (maxLength === 50) {
      return text;
    }
    return text
      .split(/\s+/)
      .map((word) => {
        if (maxLength === 0 && word.length > 13) {
          const splitIndex = Math.floor(word.length / 2);
          return `${word.slice(0, splitIndex)}-\n${word.slice(splitIndex)}`;
        }
        return word;
      })
      .join(" ");
  };

  return (
    <>
      {needsExpanding ? (
        <span
          className={`
            -mx-2 -my-1 
            cursor-pointer 
            px-2 
            py-1 
            ${expandedClassName}
            whitespace-pre-wrap
          `}
          onClick={toggleExpanded}
        >
          {isExpanded
            ? formatNotes(notes)
            : maxLength === 0
              ? "[...]"
              : formatNotes(
                  notes.substring(
                    0,
                    notes.substring(0, maxLength).lastIndexOf(" ") + 1,
                  ) + "[...]",
                )}
        </span>
      ) : (
        notes
      )}
    </>
  );
}

function toSeance({
  day,
  movie,
  time,
  theaterName,
  theaterArdmt,
  notes,
}: {
  day: string;
  movie: DialogMovie;
  time: number;
  theaterName: string;
  theaterArdmt: string;
  notes?: string;
}) {
  const date = safeDate(day).set({
    hour: Math.floor(time),
    minute: Number((60 * (time - Math.floor(time))).toPrecision(2)),
  });
  return {
    movieDate: date,
    movieTheater: theaterName,
    movieTheaterArdmt: theaterArdmt,
    movie,
    movieNote: notes || "",
  };
}

function SeancesTheater({
  movie,
  day,
  showtimesTheater,
  isExpanded,
}: {
  movie: DialogMovie;
  day: string;
  showtimesTheater: TheaterScreenings;
  isExpanded: boolean;
}) {
  const screenings = Object.values(showtimesTheater.seances);
  const setSeance = useSeanceDialogStore((s) => s.setSeance);
  const hash = useHash();

  const showDialog = useCallback(
    async ({ time }: { time: number }) => {
      window.location.hash = await hashSeance(
        toSeance({
          movie,
          day,
          time,
          theaterName: showtimesTheater.name,
          theaterArdmt: transformZipcodeToString(showtimesTheater.zipcode),
        }),
      );
    },
    [day, movie, showtimesTheater.name, showtimesTheater.zipcode],
  );

  useEffect(() => {
    if (hash === "") {
      return;
    }

    screenings.forEach(async ({ time, notes }) => {
      const seance = toSeance({
        day,
        movie,
        time,
        theaterName: showtimesTheater.name,
        theaterArdmt: transformZipcodeToString(showtimesTheater.zipcode),
        notes,
      });
      if ((await hashSeance(seance)) === hash) {
        setSeance(seance);
      }
    });
  }, [
    day,
    hash,
    movie,
    screenings,
    setSeance,
    showtimesTheater.name,
    showtimesTheater.zipcode,
  ]);

  const seanceDialogEnabled = useBeta().features.seanceDialog;

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
              {seanceDialogEnabled ? (
                <button onClick={() => showDialog({ time: screening.time })}>
                  {floatHourToString(screening.time)}
                </button>
              ) : (
                floatHourToString(screening.time)
              )}
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

export function SeancesGenerator({
  screenings,
}: {
  screenings: TheaterScreenings[];
}) {
  const sortedTheaters = useMemo(
    () => getSortedTheaters(screenings),
    [screenings],
  );
  return (
    <>
      {sortedTheaters.map((theater) => {
        const screenings = Object.values(theater.seances);
        return (
          <div key={theater.name}>
            {theater.name} ({transformZipcode(theater.zipcode)})&nbsp;:{" "}
            {screenings.map((screening, i) => (
              <span key={screening.time}>
                {floatHourToString(screening.time)}
                {screening.notes && (
                  <>
                    {" "}
                    (<i>{screening.notes}</i>)
                  </>
                )}
                {i < screenings.length - 1 && " • "}
              </span>
            ))}
          </div>
        );
      })}
    </>
  );
}
