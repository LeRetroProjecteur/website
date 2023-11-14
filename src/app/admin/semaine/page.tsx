import { Suspense } from "react";

import Semaine from "./semaine";

export default function SemainePage() {
  return (
    <Suspense fallback={<></>}>
      <Semaine />
    </Suspense>
  );
}
