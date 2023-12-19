import { Metadata } from "next";
import { Suspense } from "react";

import Calendrier from "@/components/calendrier";

export const metadata: Metadata = {
  title: "Lucid Lamar | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
};

export default function TousLesFilms() {
  return (
    <>
      <Suspense fallback={<></>}>
        <Calendrier allMovies={true} />
      </Suspense>
    </>
  );
}
