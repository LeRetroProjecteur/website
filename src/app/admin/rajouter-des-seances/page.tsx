import { Metadata } from "next";

import { getTheaters } from "@/lib/theaters";

import SubmitScreenings from "./rajouter-des-seances";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rajouter des séances",
};

export default function SubmitScreeningsPage() {
  const allTheaters = getTheaters();

  return <SubmitScreenings allTheatersPromise={allTheaters} />;
}
