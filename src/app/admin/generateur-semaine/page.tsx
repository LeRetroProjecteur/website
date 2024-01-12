import { Metadata } from "next";
import { Suspense } from "react";

import WeekGenerator from "./week-generator";

export const metadata: Metadata = {
  title: "El Generator | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
};

export default function SemaineAuCinemaPage() {
  return (
    <Suspense fallback={<></>}>
      <WeekGenerator />
    </Suspense>
  );
}
