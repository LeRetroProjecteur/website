import { Suspense } from "react";

import Calendrier from "@/components/calendrier";

export default function ToutLesFilms() {
  return (
    <Suspense fallback={<></>}>
      <Calendrier allMovies={true} />
    </Suspense>
  );
}
