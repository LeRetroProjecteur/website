"use client";

import bs58 from "bs58";
import {
  CalendarEvent,
  google,
  ics,
  office365,
  outlook,
  yahoo,
} from "calendar-link";
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
import { MetaCopy } from "../typography/typography";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

export type DialogMovie = {
  title: string;
  id: string;
  directors: string;
  year: string;
};

export type DialogSeance = {
  movie: DialogMovie;
  movieDate: DateTime;
  movieTheater: string;
  movieTheaterArdmt: string;
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
  const [state, setState] = useState<"initial" | "add-to-calendar" | "share">(
    "initial",
  );

  const {
    movie: { title, year, directors },
    movieDate,
    movieTheater,
    movieTheaterArdmt,
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
          <span className="whitespace-nowrap">
            <i>
              <u>{title.toUpperCase()}</u>
            </i>
            ,
          </span>{" "}
          <span className="whitespace-nowrap">
            {directors} ({year})
          </span>
        </div>
        <div>
          {capitalize(formatLundi1Janvier(movieDate))} à{" "}
          {movieDate.toFormat("HH'h'mm")}
          <br />
          {movieTheater} {movieTheaterArdmt ? `(${movieTheaterArdmt})` : ""}
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
  setState: (state: "initial" | "add-to-calendar" | "share") => void;
}) {
  return (
    <>
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
    </>
  );
}

function AddToCalendar({
  seance: {
    movie: { title },
    movieDate,
    movieTheater,
  },
}: {
  seance: DialogSeance;
}) {
  const calendarEvent: CalendarEvent = {
    title,
    start: movieDate.toISO(),
    end: movieDate.plus({ hours: 2 }).toISO(),
    duration: [2, "hours"],
    location: movieTheater,
  };

  const links = {
    google: google(calendarEvent),
    ical: ics(calendarEvent),
    office365: office365(calendarEvent),
    outlook: outlook(calendarEvent),
    yahoo: yahoo(calendarEvent),
  };

  return (
    <>
      <div className="grid grid-cols-2 grid-cols-[1fr,1fr] gap-12px">
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
    </>
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
  const shareUrl = () => {
    const baseUrl = window.location.origin;
    const hashPart = window.location.hash;
    return `${baseUrl}/film/${id}${hashPart}`;
  };
  const url = shareUrl();

  return (
    <>
      <div className="flex gap-8px">
        <RetroInput
          lowercase
          blue
          setValue={() => {}}
          placeholder=""
          value={url}
        />
        <div className="justify-end">
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
    </>
  );
}
