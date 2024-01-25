"use client";

import clsx from "clsx";
import { useCallback, useMemo } from "react";

import { ButtonCopy } from "@/components/typography/typography";
import { Quartier, useCalendrierStore } from "@/lib/calendrier-store";

const QUARTIERS: [string, Quartier][] = [
  ["rive gauche", Quartier.RG],
  ["rive droite", Quartier.RD],
  ["extramuros", Quartier.EM],
];

export default function QuartierSelector() {
  return (
    <div className="grid grow grid-cols-[repeat(auto-fill,_minmax(10.75rem,_1fr))] gap-x-15px gap-y-8px lg:grid-cols-[repeat(auto-fill,_minmax(17.375rem,_1fr))] lg:gap-x-20px lg:gap-y-10px">
      {QUARTIERS.map(([quartierName, quartier]) => (
        <QuartierToggler
          key={quartier}
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
          "border-retro-black": present,
          "text-retro-black": present,
        },
        "cursor-pointer border py-4px text-center lg:py-8px",
      )}
    >
      <ButtonCopy>{quartierName}</ButtonCopy>
    </div>
  );
}
