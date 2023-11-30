import { ChangeEvent, useCallback } from "react";

import { CalendrierStore } from "@/lib/calendrier-store";

export default function Search({
  useCalendrierStore,
}: {
  useCalendrierStore: CalendrierStore;
}) {
  const filter = useCalendrierStore((s) => s.filter);
  const setFilter = useCalendrierStore((s) => s.setFilter);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value),
    [setFilter],
  );

  return (
    <input
      type="text"
      className="grow border-retro-gray bg-retro-pale-green uppercase text-retro-black placeholder:text-center placeholder:text-retro-gray focus:border-retro-gray focus:outline-0 focus:ring-0 focus:placeholder:opacity-0"
      onChange={onChange}
      value={filter}
      placeholder="recherche"
    />
  );
}
