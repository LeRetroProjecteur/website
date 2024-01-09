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
    <div className="flex grow flex-wrap gap-x-20px gap-y-10px">
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
        "cursor-pointer border text-center lg:w-278px lg:py-12px",
      )}
    >
      <ButtonCopy>{quartierName}</ButtonCopy>
    </div>
  );
}
