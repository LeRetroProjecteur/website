import { Suspense } from "react";

import Calendrier from "@/components/calendrier";

export default function CalendrierPage() {
  return (
    <Suspense fallback={<></>}>
      <Calendrier allMovies={false} />
    </Suspense>
  );
}
