import RetroInput from "@/components/forms/retro-input";
import { CalendrierStore } from "@/lib/calendrier-store";

export default function Search({
  useCalendrierStore,
}: {
  useCalendrierStore: CalendrierStore;
}) {
  const filter = useCalendrierStore((s) => s.filter);
  const setFilter = useCalendrierStore((s) => s.setFilter);

  return (
    <RetroInput setValue={setFilter} value={filter} placeholder="recherche" />
  );
}
