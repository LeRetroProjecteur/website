import { useSyncExternalStore } from "react";

export const MANUAL_HASH_CHANGE_EVENT = "manualHashChange";

export function useHash() {
  const controller = new AbortController();
  return useSyncExternalStore(
    (callback) => {
      addEventListener("hashchange", callback, { signal: controller.signal });
      addEventListener("manualHashChange", callback, {
        signal: controller.signal,
      });
      return () => {
        controller.abort();
      };
    },
    () => window.location.hash.slice(1),
    () => undefined,
  );
}
