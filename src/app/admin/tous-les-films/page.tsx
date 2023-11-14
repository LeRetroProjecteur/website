import { Suspense } from "react";

import Calendrier from "@/components/calendrier";

export default function TousLesFilms() {
  return (
    <Suspense fallback={<></>}>
      <Calendrier allMovies={true} />
    </Suspense>
  );
}
