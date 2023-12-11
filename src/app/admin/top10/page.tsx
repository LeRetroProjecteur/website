import {Suspense} from "react";

import SemaineAuCinema from "./top10";

export default function SemaineAuCinemaPage() {
  return (
    <Suspense fallback={<></>}>
      <SemaineAuCinema />
    </Suspense>
  );
}
