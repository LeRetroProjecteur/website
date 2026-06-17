"use client";

import clsx from "clsx";
import { useCallback } from "react";

import { TextBox } from "@/components/layout/text-boxes";
import { ButtonCopy } from "@/components/typography/typography";
import { useCalendrierStore } from "@/lib/calendrier-store";

export default function Events() {
  const isEventsClicked = useCalendrierStore((s) => s.events);
  const toggleEvents = useCalendrierStore((s) => s.toggleEvents);
  const isCinepassClicked = useCalendrierStore((s) => s.cinepassOnly);
  const toggleCinepassOnly = useCalendrierStore((s) => s.toggleCinepassOnly);

  const onClickEvents = useCallback(
    () => toggleEvents(isEventsClicked),
    [isEventsClicked, toggleEvents],
  );

  const onClickCinepass = useCallback(
    () => toggleCinepassOnly(),
    [toggleCinepassOnly],
  );

  return (
    <>
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
          "h-42px flex-1 lg:h-48px",
        )}
        onClick={onClickEvents}
      >
        <ButtonCopy className="lg:hidden">Séances spéc.</ButtonCopy>
        <ButtonCopy className="hidden lg:block">Séances spéciales</ButtonCopy>
      </TextBox>

      <TextBox
        className={clsx(
          {
            "border-retro-gray": !isCinepassClicked,
            "text-retro-gray": !isCinepassClicked,
          },
          {
            "bg-retro-gray": isCinepassClicked,
            "text-white": isCinepassClicked,
          },
          "h-42px flex-1 lg:h-48px",
        )}
        onClick={onClickCinepass}
      >
        <ButtonCopy className="lg:hidden">Cinépass</ButtonCopy>
        <ButtonCopy className="hidden lg:block">Cinépass Pathé</ButtonCopy>
      </TextBox>
    </>
  );
}
