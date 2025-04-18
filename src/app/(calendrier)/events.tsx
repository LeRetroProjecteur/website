"use client";

import clsx from "clsx";
import { useCallback } from "react";

import { TextBox } from "@/components/layout/text-boxes";
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
    <TextBox
      className={clsx(
        {
          "border-retro-gray": !isEventsClicked,
          "text-retro-gray": !isEventsClicked,
        },
        {
          "bg-retro-gray": isEventsClicked,
          "text-white": isEventsClicked,
        },
        "h-42px lg:h-48px",
      )}
      onClick={onClick}
    >
      <ButtonCopy className="lg:hidden">Séances spéc.</ButtonCopy>
      <ButtonCopy className="hidden lg:block">Séances spéciales</ButtonCopy>
    </TextBox>
  );
}
