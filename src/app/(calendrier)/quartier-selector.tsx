"use client";

import clsx from "clsx";
import { useCallback, useMemo, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { ButtonCopy } from "@/components/typography/typography";
import { Quartier, useCalendrierStore } from "@/lib/calendrier-store";

const QUARTIERS: [string, Quartier][] = [
  ["rive gauche", Quartier.RG],
  ["rive droite", Quartier.RD],
  ["extramuros", Quartier.EM],
];

export default function QuartierSelector({ close }: { close: () => void }) {
  const ref = useRef(null);
  useOnClickOutside(ref, close);
  return (
    <div
      ref={ref}
      className="grid grow grid-cols-[repeat(auto-fill,_minmax(40%,_1fr))] gap-x-8px gap-y-8px lg:grid-cols-[repeat(auto-fill,_minmax(25%,_1fr))] lg:gap-x-20px lg:gap-y-10px"
    >
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
