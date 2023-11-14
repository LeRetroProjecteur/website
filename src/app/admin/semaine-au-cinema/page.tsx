import { Suspense } from "react";

import SemaineAuCinema from "./semaine-au-cinema";

export default function SemaineAuCinemaPage() {
  return (
    <Suspense fallback={<></>}>
      <SemaineAuCinema />
    </Suspense>
  );
}
