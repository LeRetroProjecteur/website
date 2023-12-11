import {Suspense} from "react";

import SemaineAuCinema from "./top2023";

export default function SemaineAuCinemaPage() {
  return (
    <Suspense fallback={<></>}>
      <SemaineAuCinema />
    </Suspense>
  );
}
