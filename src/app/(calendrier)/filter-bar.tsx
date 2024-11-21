"use client";

import RetroInput from "@/components/forms/retro-input";
import { useCalendrierStore } from "@/lib/calendrier-store";

export default function FilterBar({
  shortPlaceholder,
}: {
  shortPlaceholder?: boolean;
}) {
  const filter = useCalendrierStore((s) => s.filter);
  const setFilter = useCalendrierStore((s) => s.setFilter);

  let placeholder = "";
  {
    shortPlaceholder
      ? (placeholder = "Filtrer...")
      : (placeholder = "Filtrer par titre, cinéaste, pays...");
  }

  return (
    <RetroInput setValue={setFilter} value={filter} placeholder={placeholder} />
  );
}
