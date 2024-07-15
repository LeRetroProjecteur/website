"use client";

import clsx from "clsx";
import { min, sortBy, take } from "lodash-es";
import { useCallback, useMemo, useState } from "react";

import { ShowtimesTheater } from "@/lib/types";
import { floatHourToString } from "@/lib/util";

import { CalendrierCopy } from "../typography/typography";

export default function Seances({
  showtimesTheaters,
}: {
  showtimesTheaters: ShowtimesTheater[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(
    () => setIsExpanded(!isExpanded),
    [isExpanded, setIsExpanded],
  );

  const sortedTheaters = useMemo(
    () =>
      sortBy(showtimesTheaters, [
        function (showtimesTheaters) {
          return min(
            showtimesTheaters.screenings.map((screening) => screening.time),
          );
        },
      ]),
    [showtimesTheaters],
  );

  const unexpandedTheaters = useMemo(
    () => take(sortedTheaters, 3),
    [sortedTheaters],
  );

  const needsExpanding = sortedTheaters.length !== unexpandedTheaters.length;

  return (
    <div
      className={clsx(
        "grid-auto-rows grid grid-cols-[calc(100%-148px),148px] gap-y-10px lg:gap-y-5px xl:grid-cols-[calc(100%-180px),180px]",
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
              {isExpanded ? "Moins de séances ↑" : "Plus de séances ↓"}
            </CalendrierCopy>
          </div>
        </>
      )}
    </div>
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
  showtimesTheater: ShowtimesTheater;
  isExpanded: boolean;
}) {
  const screenings = sortBy(
    showtimesTheater.screenings,
    (screening) => screening.time,
  );

  return (
    <div
      className="group/cinema col-span-full flex grid grid-cols-[subgrid] items-start justify-between"
      key={showtimesTheater.name}
    >
      <div className="grow pr-10px lg:pr-30px">
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
            <CalendrierCopy>{floatHourToString(screening.time)}</CalendrierCopy>
            <div className="hidden group-last/seances:hidden lg:block">
              <CalendrierCopy>&nbsp;•&nbsp;</CalendrierCopy>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
