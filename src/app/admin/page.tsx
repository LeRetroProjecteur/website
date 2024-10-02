"use client";

import Link from "next/link";
import { useCallback } from "react";

import { SousTitre1 } from "@/components/typography/typography";
import { useCalendrierStore } from "@/lib/calendrier-store";

export default function Admin() {
  const resetCalendar = useCallback(() => {
    useCalendrierStore.getState().reset();
  }, []);

  return (
    <div className="flex grow flex-col items-center justify-center gap-10px">
      <SousTitre1>
        <Link
          onClick={resetCalendar}
          className="underline"
          href="/admin/tous-les-films"
        >
          Tous les Films
        </Link>
      </SousTitre1>
      <SousTitre1>
        <Link
          onClick={resetCalendar}
          className="underline"
          href="/admin/semaine-prochaine"
        >
          La semaine prochaine...
        </Link>
      </SousTitre1>
      <SousTitre1>
        <Link className="underline" href="/admin/generateur">
          El Generator
        </Link>
      </SousTitre1>
      <SousTitre1>
        <Link className="underline" href="/admin/marseille">
          Marseille
        </Link>
      </SousTitre1>
      <SousTitre1>
        <Link className="underline" href="/admin/marseille-tous-les-films">
          Marseille - Tous les films
        </Link>
      </SousTitre1>
      <SousTitre1>
        <Link className="underline" href="/admin/submit-screenings">
          Submit-screenings
        </Link>
      </SousTitre1>
    </div>
  );
}
