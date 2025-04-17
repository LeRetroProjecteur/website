"use client";

import clsx from "clsx";
import { useCallback, useMemo } from "react";

import { QUARTIERS } from "@/app/(calendrier)/quartier-constants";
import { ButtonCopy } from "@/components/typography/typography";
import { Quartier, useCalendrierStore } from "@/lib/calendrier-store";

type QuartierPair = [string, Quartier];

export default function QuartierSelector({
  quartiersOptions = QUARTIERS as QuartierPair[],
}: {
  quartiersOptions?: QuartierPair[];
}) {
  const isGridOfFour = quartiersOptions.length === 4;
  const gridClasses = isGridOfFour
    ? "grid grow grid-cols-[repeat(auto-fill,_minmax(40%,_1fr))] gap-x-8px gap-y-8px lg:grid-cols-[repeat(auto-fill,_minmax(20%,_1fr))] lg:gap-x-10px lg:gap-y-10px"
    : "grid grow grid-cols-[repeat(auto-fill,_minmax(40%,_1fr))] gap-x-8px gap-y-8px lg:grid-cols-[repeat(auto-fill,_minmax(25%,_1fr))] lg:gap-x-20px lg:gap-y-10px";
  return (
    <div className={gridClasses}>
      {quartiersOptions.map(([quartierName, quartier]) => (
        <QuartierToggler
          key={String(quartier)}
          quartierName={quartierName}
          quartier={quartier}
        />
      ))}
    </div>
  );
}

function QuartierToggler({
  quartierName,
  quartier,
}: {
  quartierName: string;
  quartier: Quartier;
}) {
  const quartiers = useCalendrierStore((s) => s.quartiers);
  const toggleQuartier = useCalendrierStore((s) => s.toggleQuartier);
  const present = useMemo(
    () => quartiers.includes(quartier),
    [quartier, quartiers],
  );
  const onClick = useCallback(
    () => toggleQuartier(quartier),
    [quartier, toggleQuartier],
  );

  return (
    <div
      onClick={onClick}
      className={clsx(
        {
          "border-retro-gray": !present,
          "text-retro-gray": !present,
        },
        {
          "bg-retro-gray": present,
          "text-white": present,
        },
        "flex h-42px cursor-pointer items-center justify-center border border-retro-gray lg:h-48px",
      )}
    >
      <ButtonCopy>{quartierName}</ButtonCopy>
    </div>
  );
}
