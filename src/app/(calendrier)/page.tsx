import { Suspense } from "react";

import { format } from "date-fns";

import Calendrier from "@/components/calendrier";
import { Movie } from "@/lib/types";

async function getApiMovies(date: Date): Promise<Movie[]> {
  return (await fetch(`/api/${format(date, "y-MM-dd")}`)).json();
}

export default function CalendrierPage() {
  return (
    <Suspense fallback={<></>}>
      <Calendrier allMovies={false} />
    </Suspense>
  );
}
