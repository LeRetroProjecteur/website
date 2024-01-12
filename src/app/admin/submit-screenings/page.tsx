import { Metadata } from "next";
import { Suspense } from "react";

import SubmitScreenings from "./submit-screenings";

export const metadata: Metadata = {
  title:
    "Rajouter des séances | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
};

export default function SubmitScreeningsPage() {
  return (
    <Suspense fallback={<></>}>
      <SubmitScreenings />
    </Suspense>
  );
}
