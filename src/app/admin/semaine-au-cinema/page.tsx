import { Metadata } from "next";
import { Suspense } from "react";

import SemaineAuCinema from "./semaine-au-cinema";

export const metadata: Metadata = {
  title: "El Generator | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
};

export default function SemaineAuCinemaPage() {
  return (
    <Suspense fallback={<></>}>
      <SemaineAuCinema />
    </Suspense>
  );
}
