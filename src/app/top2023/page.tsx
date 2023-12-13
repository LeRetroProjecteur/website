import {Suspense} from "react";

import SemaineAuCinema from "./top2023";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Sondage Top 2023 | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
};

export default function SemaineAuCinemaPage() {
  return (
    <Suspense fallback={<></>}>
      <SemaineAuCinema />
    </Suspense>
  );
}