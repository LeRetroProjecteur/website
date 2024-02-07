import { without } from "lodash-es";
import { DateTime } from "luxon";
import { StoreApi, UseBoundStore, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getStartOfTodayInParis } from "./util";

export enum Quartier {
  RG = "rg",
  RD = "rd",
  EM = "em",
}

export type CalendrierStore = UseBoundStore<StoreApi<CalendrierState>>;

interface CalendrierState {
  date: DateTime;
  dateChanged: boolean;
  minHour: number;
  maxHour: number;
  filter: string;
  quartiers: Quartier[];
  shouldReset: boolean;
  setDate: (date: DateTime) => void;
  setMinHour: (minHour: number) => void;
  setMaxHour: (maxHour: number) => void;
  setFilter: (filter: string) => void;
  toggleQuartier: (quartier: Quartier) => void;
  reset: () => void;
  scheduleReset: () => void;
}

export function getUseCalendrierStore() {
  return create<CalendrierState>()(
    persist(
      (set, get) => ({
        date: getStartOfTodayInParis(),
        dateChanged: false,
        minHour: 0,
        maxHour: 24,
        filter: "",
        quartiers: [],
        shouldReset: false,
        setDate: (date: DateTime) => {
          set({ date, dateChanged: true });
        },
        setMinHour: (minHour: number) => set({ minHour }),
        setMaxHour: (maxHour: number) => set({ maxHour }),
        setFilter: (filter: string) => set({ filter }),
        toggleQuartier: (quartier: Quartier) => {
          const quartiers = get().quartiers;
          if (quartiers.includes(quartier)) {
            set({ quartiers: without(quartiers, quartier) });
          } else {
            set({ quartiers: [...quartiers, quartier] });
          }
        },
        reset: () => {
          set({
            date: getStartOfTodayInParis(),
            dateChanged: false,
            minHour: 0,
            maxHour: 24,
            filter: "",
            quartiers: [],
            shouldReset: false,
          });
        },
        scheduleReset: () => set({ shouldReset: true }),
      }),
      {
        name: "calendrier-storage",
        storage: createJSONStorage(() => sessionStorage, {
          reviver: (k, v) =>
            k === "date"
              ? DateTime.fromISO(v as string, {
                  zone: "Europe/Paris",
                  locale: "fr",
                })
              : v,
        }),
        partialize: ({
          date,
          dateChanged,
          minHour,
          maxHour,
          filter,
          quartiers,
          shouldReset,
        }) => ({
          date,
          dateChanged,
          minHour,
          maxHour,
          filter,
          quartiers,
          shouldReset,
        }),
      },
    ),
  );
}

export const useCalendrierStore = getUseCalendrierStore();
