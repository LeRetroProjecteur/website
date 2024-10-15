"use client";

import clsx from "clsx";
import { useCallback } from "react";

import { ButtonCopy } from "@/components/typography/typography";
import { useCalendrierStore } from "@/lib/calendrier-store";

export default function Events() {
  const isEventsClicked = useCalendrierStore((s) => s.events);
  const toggleEvents = useCalendrierStore((s) => s.toggleEvents);
  const onClick = useCallback(
    () => toggleEvents(isEventsClicked),
    [isEventsClicked, toggleEvents],
  );
  return (
    <div
      className={clsx(
        {
          "border-retro-gray": !isEventsClicked,
          "text-retro-gray": !isEventsClicked,
        },
        {
          "bg-retro-gray": isEventsClicked,
          "text-white": isEventsClicked,
        },
        "flex h-42px grow cursor-pointer items-center justify-center border lg:h-48px",
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <ButtonCopy>Séances spéciales</ButtonCopy>
      </div>
    </div>
  );
}
