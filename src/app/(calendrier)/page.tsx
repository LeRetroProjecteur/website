import { Metadata } from "next";
import { Suspense } from "react";

import Calendrier from "@/components/calendrier";

export const metadata: Metadata = {
  title: "Calendrier | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
};

export default function CalendrierPage() {
  return (
    <Suspense fallback={<></>}>
      <Calendrier allMovies={false} />
    </Suspense>
  );
}
