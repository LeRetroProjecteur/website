"use client";

import { AddToCalendarButton } from "add-to-calendar-button-react";
import { DateTime } from "luxon";
import { createContext, useContext, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import { StoreApi, createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import { checkNotNull } from "@/lib/util";

import tailwindConfig from "../../../tailwind.config";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const fullConfig = resolveConfig(tailwindConfig);

const addToCalendarStyleOverride = `
  --base-font-size-l: 20px;
  --base-font-size-m: 20px;
  --base-font-size-s: 20px;
  --font: ${fullConfig.theme?.fontFamily?.suisse};
  --wrapper-padding: 0px;
  --btn-background: ${fullConfig.theme?.colors?.["retro-blue"]};
  --btn-hover-background: ${fullConfig.theme?.colors?.["retro-blue"]};
  --btn-border: ${fullConfig.theme?.colors?.["retro-gray"]};
  --btn-border-radius: 0;
  --btn-padding-x: 1em;
  --btn-padding-y: .65em;
  --btn-font-weight: ${fullConfig.theme?.fontWeight?.medium};
  --btn-text: ${fullConfig.theme?.colors?.["retro-gray"]};
  --btn-hover-text: ${fullConfig.theme?.colors?.["retro-gray"]};
  --btn-shadow: none;
  --btn-hover-shadow: none;
  --btn-active-shadow: none;
`;

export type DialogSeance = {
  movieTitle: string;
  movieDate: DateTime;
  movieTheater: string;
};

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
        clearSeance: () =>
          set((s) => {
            s.seance = undefined;
          }),
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
    <Dialog open={seance != null} onOpenChange={clearSeance}>
      {seance == null ? null : (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter à votre calendrier</DialogTitle>
          </DialogHeader>
          <AddToCalendarButton
            name={seance.movieTitle}
            startDate={checkNotNull(seance.movieDate.toISODate())}
            endDate={checkNotNull(
              seance.movieDate.plus({ hours: 2 }).toISODate(),
            )}
            startTime={seance.movieDate.toFormat("HH:mm")}
            endTime={seance.movieDate.plus({ hours: 2 }).toFormat("HH:mm")}
            options={[
              "Google",
              "iCal",
              "Microsoft365",
              "MicrosoftTeams",
              "Outlook.com",
              "Yahoo",
            ]}
            timeZone="Europe/Paris"
            location={seance.movieTheater}
            iCalFileName={`${seance.movieTitle}-${checkNotNull(
              seance.movieTheater,
            )}`}
            styleLight={addToCalendarStyleOverride}
            buttonsList={true}
            language="fr"
            customLabels={{
              google: "GOOGLE CALENDAR",
              outlookcom: "OUTLOOK",
              ms365: "MICROSFT 365",
              msteams: "MICROSOFT TEAMS",
              yahoo: "YAHOO",
              ical: "ICAL",
            }}
            hideBranding={true}
          />
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button">Retour</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
