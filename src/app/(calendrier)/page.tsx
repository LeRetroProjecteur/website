import { Suspense } from "react";

import Calendrier from "@/app/(calendrier)/calendrier";

export default function CalendrierPage() {
  return (
    <Suspense fallback={<></>}>
      <Calendrier />
    </Suspense>
  );
}
