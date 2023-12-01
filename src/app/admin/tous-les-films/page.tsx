import { Suspense } from "react";

import Calendrier from "@/components/calendrier";

export default function TousLesFilms() {
  return (
    <>
      <h2>Bienvenue Frère Lumar !</h2>
      <Suspense fallback={<></>}>
        <Calendrier allMovies={true} />
      </Suspense>
    </>
  );
}
