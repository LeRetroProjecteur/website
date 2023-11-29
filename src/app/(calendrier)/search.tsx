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
      className="bg-retro-pale-green placeholder:text-retro-gray text-retro-black border-retro-gray focus:border-retro-gray grow uppercase placeholder:text-center focus:outline-0 focus:ring-0 focus:placeholder:opacity-0"
      onChange={onChange}
      value={filter}
      placeholder="recherche"
    />
  );
}
