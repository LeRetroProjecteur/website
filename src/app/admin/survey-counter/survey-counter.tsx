"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface Ballot {
  name: string;
}

export default function SurveyCounter() {
  const _ = useSearchParams();
  const [ballots, setBallots] = useState<Ballot[]>([]);

  useEffect(() => {
    (async () => {
      setBallots(await (await fetch("/admin/survey-counter/api")).json());
    })();
  }, []);

  return ballots.length;
}
