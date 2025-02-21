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
import { Check, Copy } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { createContext, useContext, useState, useTransition } from "react";
import { StoreApi, createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import { checkNotNull, formatLundi1Janvier } from "@/lib/util";

import RetroInput from "../forms/retro-input";
import { MetaCopy } from "../typography/typography";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

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
          const urlWithoutHash = window.location.href.split("#")[0];
          window.history.replaceState({}, document.title, urlWithoutHash);
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

  return (
    <DialogContent aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>
          <u>{seance.movie.title}</u> ({seance.movie.year})
        </DialogTitle>
      </DialogHeader>
      {(function () {
        switch (state) {
          case "initial":
            return <SeanceInitialDialog setState={setState} seance={seance} />;
          case "add-to-calendar":
            return <AddToCalendar seance={seance} />;
          case "share":
            return <ShareSeance />;
        }
      })()}
    </DialogContent>
  );
}

function SeanceInitialDialog({
  seance: {
    movie: { directors },
    movieTheater,
    movieDate,
  },
  setState,
}: {
  seance: DialogSeance;
  setState: (state: "initial" | "add-to-calendar" | "share") => void;
}) {
  return (
    <>
      <div className="border-b pb-16px">
        <MetaCopy>
          <div className="text-center leading-[26px]">
            {directors}
            <br />
            Le {formatLundi1Janvier(movieDate)} à{" "}
            {movieDate.toLocaleString(DateTime.TIME_SIMPLE)}
            <br />
            {movieTheater}
          </div>
        </MetaCopy>
      </div>
      <div className="flex flex-col gap-10px pb-16px">
        <Button
          padding="padded"
          variant="default"
          onClick={() => setState("share")}
        >
          Partager cette séance
        </Button>
        <Button
          padding="padded"
          variant="default"
          onClick={() => setState("add-to-calendar")}
        >
          Exporter à mon calendrier
        </Button>
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
      <div className="grid grid-cols-2 grid-cols-[1fr,1fr] gap-14px">
        {Object.entries(links).map(([type, link]) => (
          <Button padding="padded" variant="default" asChild key={type}>
            <Link target="_blank" href={link}>
              {type}
            </Link>
          </Button>
        ))}
      </div>
    </>
  );
}

function ShareSeance() {
  const [showCopied, startShowingCopied] = useTransition();

  return (
    <>
      <div className="flex gap-8px">
        <RetroInput
          lowercase
          blue
          setValue={() => {}}
          placeholder=""
          value={window.location.href}
        />
        <div className="justify-end">
          <Button
            iconStyle="iconOnly"
            variant="default"
            asChild
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              startShowingCopied(async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
              });
            }}
          >
            <div>{showCopied ? <Check /> : <Copy />}</div>
          </Button>
        </div>
      </div>
    </>
  );
}
