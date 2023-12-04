"use client";

import clsx from "clsx";
import { useCallback, useMemo } from "react";

import { CalendrierStore, Quartier } from "@/lib/calendrier-store";

const QUARTIERS: [string, Quartier][] = [
  ["rive gauche", Quartier.RG],
  ["rive droite", Quartier.RD],
  ["extramuros", Quartier.EM],
];

export default function QuartierSelector({
  useCalendrierStore,
}: {
  useCalendrierStore: CalendrierStore;
}) {
  return (
    <div className="flex grow flex-wrap gap-x-4 gap-y-2">
      {QUARTIERS.map(([quartierName, quartier]) => (
        <QuartierToggler
          key={quartier}
          quartierName={quartierName}
          quartier={quartier}
          useCalendrierStore={useCalendrierStore}
        />
      ))}
    </div>
  );
}

function QuartierToggler({
  quartierName,
  quartier,
  useCalendrierStore,
}: {
  quartierName: string;
  quartier: Quartier;
  useCalendrierStore: CalendrierStore;
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
          "border-retro-black": present,
          "text-retro-black": present,
        },
        "w-[172px] cursor-pointer border text-center font-medium uppercase uppercase leading-7 lg:w-[278px] lg:py-2 lg:text-xl",
      )}
    >
      {quartierName}
    </div>
  );
}
