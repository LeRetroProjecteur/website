import { without } from "lodash-es";
import { DateTime } from "luxon";
import { StoreApi, UseBoundStore, create } from "zustand";

import { getStartOfTodayInParis } from "./utils";

export enum Quartier {
  RG = "rg",
  RD = "rd",
  EM = "em",
  Marseille = "Marseille",
  Aix_en_Provence = "Aix-en-Provence",
  Etang_de_Berre = "Étang de Berre",
  Aubagne = "Aubagne",
}

export type CalendrierStore = UseBoundStore<StoreApi<CalendrierState>>;

interface CalendrierState {
  date: DateTime;
  dateChanged: boolean;
  minHour: number;
  maxHour: number;
  filter: string;
  quartiers: Quartier[];
  events: boolean;
  cinepassOnly: boolean;
  setDate: (date: DateTime) => void;
  setMinHour: (minHour: number) => void;
  setMaxHour: (maxHour: number) => void;
  setFilter: (filter: string) => void;
  toggleQuartier: (quartier: Quartier) => void;
  toggleEvents: (events: boolean) => void;
  toggleCinepassOnly: () => void;
  reset: () => void;
}

export function getUseCalendrierStore() {
  return create<CalendrierState>()((set, get) => ({
    date: getStartOfTodayInParis(),
    dateChanged: false,
    minHour: 0,
    maxHour: 24,
    filter: "",
    quartiers: [],
    events: false,
    cinepassOnly: false,
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
    toggleEvents: (events: boolean) => set({ events: !events }),
    toggleCinepassOnly: () =>
      set((state) => ({ cinepassOnly: !state.cinepassOnly })),
    reset: () => {
      set({
        date: getStartOfTodayInParis(),
        dateChanged: false,
        minHour: 0,
        maxHour: 24,
        filter: "",
        quartiers: [],
        events: false,
        cinepassOnly: false,
      });
    },
  }));
}

export const useCalendrierStore = getUseCalendrierStore();
