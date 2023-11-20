"use client";

import { create } from "zustand";

export const useOfflineStore = create<{
  offline: boolean;
  backOnline: boolean;
}>()(() => {
  return {
    offline: false,
    backOnline: false,
  };
});

const setOnline = () => useOfflineStore.setState({ backOnline: true });
const setOffline = () =>
  useOfflineStore.setState({ offline: true, backOnline: false });

if (typeof window !== "undefined") {
  addEventListener("online", () => setOnline);
  addEventListener("offline", () => setOffline);
}

export function safeFetch(
  ...args: Parameters<typeof fetch>
): ReturnType<typeof fetch> {
  return fetch(...args)
    .then((response) => {
      setOnline();
      return response;
    })
    .catch((e) => {
      setOffline();
      throw e;
    });
}
