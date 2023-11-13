import { Metadata } from "next";
import { Suspense } from "react";

import Details from "./details";

export const metadata: Metadata = {
  title: "Détails du film | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
};

export default function DetailsPage({}: {}) {
  return (
    <Suspense fallback={<></>}>
      <Details />
    </Suspense>
  );
}
