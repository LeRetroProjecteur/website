"use client";

import bs58 from "bs58";
import { CalendarEvent, google, ics, office365, outlook } from "calendar-link";
import { capitalize } from "lodash-es";
import { Check, Copy } from "lucide-react";
import { DateTime } from "luxon";
import { createContext, useContext, useState, useTransition } from "react";
import { StoreApi, createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import { MANUAL_HASH_CHANGE_EVENT } from "@/lib/useHash";
import { checkNotNull, formatLundi1Janvier } from "@/lib/utils";

import RetroInput from "../forms/retro-input";
import { TextBox } from "../layout/text-boxes";
import { transformZipcode } from "../theaters/theaters";
import { MetaCopy } from "../typography/typography";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

export type DialogMovie = {
  title: string;
  id: string;
  directors: string;
  year: string;
  duration?: string;
};

export type DialogSeance = {
  movie: DialogMovie;
  movieDate: DateTime;
  movieTheater: string;
  movieTheaterZipcode: string;
  movieNote: string;
};

export async function hashSeance(seance: DialogSeance) {
  return bs58.encode(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-1",
        new TextEncoder().encode(
          `${seance.movie.id}|${seance.movieDate.toUnixInteger()}|${
            seance.movieTheater
          }`,
        ),
      ),
    ),
  );
}

type DialogState = "initial" | "add-to-calendar" | "share";

type DialogStore = {
  seance?: DialogSeance;
  setSeance: (seance: DialogSeance) => void;
  clearSeance: () => void;
};

const StoreContext = createContext<StoreApi<DialogStore> | undefined>(
  undefined,
);

function createDialogStore() {
  return createStore<DialogStore>()(
    immer((set) => {
      return {
        setSeance: (seance: DialogSeance) =>
          set((s) => {
            s.seance = seance;
          }),
        clearSeance: () => {
          history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search,
          );
          window.dispatchEvent(new Event(MANUAL_HASH_CHANGE_EVENT));
          set((s) => {
            s.seance = undefined;
          });
        },
      };
    }),
  );
}

export function SeanceDialogStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(createDialogStore);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useSeanceDialogStore<T>(selector: (s: DialogStore) => T): T {
  const store = checkNotNull(useContext(StoreContext));
  return useStore(store, selector);
}

export function SeanceDialog() {
  const seance = useSeanceDialogStore((s) => s.seance);
  const clearSeance = useSeanceDialogStore((s) => s.clearSeance);
  return (
    <Dialog modal={false} open={seance != null} onOpenChange={clearSeance}>
      {seance == null ? null : <SeanceDialogBody seance={seance} />}
    </Dialog>
  );
}

function SeanceDialogBody({ seance }: { seance: DialogSeance }) {
  const [state, setState] = useState<DialogState>("initial");

  const {
    movie: { title, year, directors },
    movieDate,
    movieTheater,
    movieTheaterZipcode,
    movieNote,
  } = seance;
  return (
    <DialogContent aria-describedby={undefined}>
      <DialogHeader>Séance</DialogHeader>
      <MetaCopy
        lowercase
        className="flex flex-col gap-y-20px border-b pb-17px text-center"
      >
        <div>
          <span className="break-words">
            <i>
              <u>{title.toUpperCase()}</u>
            </i>
            ,
          </span>{" "}
          <span className="break-words">
            {directors}&nbsp;({year})
          </span>
        </div>
        <div>
          {capitalize(formatLundi1Janvier(movieDate))} à{" "}
          {movieDate.toFormat("HH'h'mm")}
          <br />
          {movieTheater} ({transformZipcode(movieTheaterZipcode)})
        </div>
        {movieNote ? <div>{movieNote}</div> : null}
      </MetaCopy>
      {(function () {
        switch (state) {
          case "initial":
            return <SeanceInitialDialog setState={setState} />;
          case "add-to-calendar":
            return <AddToCalendar seance={seance} />;
          case "share":
            return <ShareSeance seance={seance} />;
        }
      })()}
    </DialogContent>
  );
}

function SeanceInitialDialog({
  setState,
}: {
  setState: (state: DialogState) => void;
}) {
  return (
    <div className="flex flex-col gap-y-12px">
      <TextBox
        onClick={() => setState("share")}
        className="bg-retro-gray text-retro-blue hover:bg-retro-blue hover:text-retro-gray"
      >
        Partager la séance
      </TextBox>
      <TextBox
        onClick={() => setState("add-to-calendar")}
        className="bg-retro-gray text-retro-blue hover:bg-retro-blue hover:text-retro-gray"
      >
        Rajouter au calendrier
      </TextBox>
    </div>
  );
}

function AddToCalendar({
  seance: {
    movie: { id, title, directors, year, duration },
    movieDate,
    movieTheater,
  },
}: {
  seance: DialogSeance;
}) {
  const durationSeconds = parseInt(duration ?? "");
  const eventMinutes = isNaN(durationSeconds)
    ? 120
    : Math.round(durationSeconds / 60) + 15;
  const calendarEvent: CalendarEvent = {
    title: `${title}, ${directors} (${year})`,
    start: movieDate.toISO(),
    end: movieDate.plus({ minutes: eventMinutes }).toISO(),
    location: movieTheater,
    description: `https://leretroprojecteur.com/film/${id}`,
  };

  const links = {
    google: google(calendarEvent),
    ical: ics(calendarEvent),
    office365: office365(calendarEvent),
    outlook: outlook(calendarEvent),
  };

  return (
    <div className="grid grid-cols-2 gap-12px">
      {Object.entries(links).map(([type, link]) => (
        <TextBox
          key={type}
          onClick={() => {
            if (type === "ical") {
              const a = document.createElement("a");
              a.href = link;
              a.download = `${title} (${movieTheater}).ics`;
              a.click();
            } else {
              window.open(link, "_blank");
            }
          }}
          className="bg-retro-gray text-retro-blue hover:bg-retro-blue hover:text-retro-gray"
        >
          {type}
        </TextBox>
      ))}
    </div>
  );
}

function ShareSeance({
  seance: {
    movie: { id },
  },
}: {
  seance: DialogSeance;
}) {
  const [showCopied, startShowingCopied] = useTransition();
  const url = `https://leretroprojecteur.com/film/${id}${window.location.hash}`;

  return (
    <div className="flex gap-8px">
      <RetroInput
        lowercase
        blue
        setValue={() => {}}
        placeholder=""
        value={url}
      />
      <div>
        <TextBox
          onClick={() => {
            navigator.clipboard.writeText(url);
            startShowingCopied(async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
            });
          }}
          className="bg-retro-gray text-retro-blue hover:bg-retro-blue hover:text-retro-gray"
        >
          <div>{showCopied ? <Check /> : <Copy />}</div>
        </TextBox>
      </div>
    </div>
  );
}
