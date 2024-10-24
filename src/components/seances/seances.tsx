"use client";

import clsx from "clsx";
import { min, sortBy, take } from "lodash-es";
import { useCallback, useMemo, useState } from "react";

import { TheaterScreenings } from "@/lib/types";
import { floatHourToString } from "@/lib/util";

import { CalendrierCopy } from "../typography/typography";

export default function Seances({
  screenings,
}: {
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
            screeningsTheaters.screenings.map((screening) => screening.time),
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

  if (!needsExpanding) {
    return <span>{notes}</span>;
  }

  if (isExpanded) {
    return (
      <span className="cursor-pointer" onClick={toggleExpanded}>
        {notes}
      </span>
    );
  }

  const truncatedText = notes.substring(
    0,
    notes.substring(0, maxLength).lastIndexOf(" ")
  );

  return (
    <span>
      {truncatedText}{" "}
      <span
        className="cursor-pointer inline-block px-2 -mx-2 py-1 -my-1 hover:text-gray-600"
        onClick={toggleExpanded}
      >
        [...]
      </span>
    </span>
  );
}

export function transformZipcode(inZip: string) {
  if (inZip.substring(0, 2) == "75") {
    inZip = inZip.substring(3, 5);
    if (inZip == "01") {
      return (
        <span>
          1<sup style={{ lineHeight: 0 }}>er</sup>
        </span>
      );
    } else if (inZip.substring(0, 1) == "0") {
      inZip = inZip.substring(1, 2);
    }
    return (
      <span>
        {inZip}
        <sup style={{ lineHeight: 0 }}>e</sup>
      </span>
    );
  } else {
    return <span>{inZip}</span>;
  }
}

export function SeancesTheater({
  showtimesTheater,
  isExpanded,
}: {
  showtimesTheater: TheaterScreenings;
  isExpanded: boolean;
}) {
  const screenings = sortBy(
    showtimesTheater.screenings,
    (screening) => screening.time,
  );

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
        {screenings.map((screening) => (
          <div
            key={screening.time}
            className={clsx("group/seances flex justify-end", {
              "group-hover/cinema:underline": isExpanded,
            })}
          >
            <CalendrierCopy>
              {floatHourToString(screening.time)}
              {screening.notes != null && (
                <span className="text-retro-gray">
                  {" "}
                  <span className="hidden lg:inline">
                    <FormatNotes notes={screening.notes} maxLength={50} />
                  </span>
                  <span className="lg:hidden">
                    <FormatNotes notes={screening.notes} maxLength={0} />
                  </span>
                </span>
              )}
            </CalendrierCopy>
            <div className="hidden group-last/seances:hidden lg:block">
              <CalendrierCopy>&nbsp;•&nbsp;</CalendrierCopy>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
