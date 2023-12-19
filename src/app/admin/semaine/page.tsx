import { Metadata } from "next";
import { Suspense } from "react";

import Semaine from "./semaine";

export const metadata: Metadata = {
  title:
    "La semaine prochaine | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
};

export default function SemainePage() {
  return (
    <Suspense fallback={<></>}>
      <Semaine />
    </Suspense>
  );
}
