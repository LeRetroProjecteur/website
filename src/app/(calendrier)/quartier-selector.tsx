"use client";

import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";

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
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);

  return (
    <div className="flex grow flex-col gap-2">
      <div className="flex items-center justify-center gap-1 border border-retro-gray py-1">
        <div className="font-medium uppercase">par quartiers</div>{" "}
        <div className="flex cursor-pointer items-center" onClick={toggleOpen}>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </div>
      </div>
      {isOpen ? (
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {QUARTIERS.map(([quartierName, quartier]) => (
            <QuartierToggler
              key={quartier}
              quartierName={quartierName}
              quartier={quartier}
              useCalendrierStore={useCalendrierStore}
            />
          ))}
        </div>
      ) : null}
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
      className={classNames(
        {
          "border-retro-gray": !present,
          "text-retro-gray": !present,
        },
        {
          "border-retro-black": present,
          "text-retro-black": present,
        },
        "cursor-pointer border px-7 py-1 font-medium uppercase uppercase",
      )}
    >
      {quartierName}
    </div>
  );
}

function ArrowUp() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(-0.642962 -0.765898 0.738864 -0.673855 13.8796 8.11853)"
        stroke="black"
        strokeWidth="1.5"
      />
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(0.642962 -0.765898 -0.738864 -0.673855 0 8.11853)"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(0.642962 0.765898 -0.738864 0.673855 0 2)"
        stroke="black"
        strokeWidth="1.5"
      />
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(-0.642962 0.765898 0.738864 0.673855 13.8796 2)"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  );
}
