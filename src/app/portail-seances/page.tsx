import { Metadata } from "next";

import { getTheaters } from "@/lib/theaters";

import SubmitScreenings from "./portail-seances";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portail Séances",
};

export default function SubmitScreeningsPage() {
  const allTheaters = getTheaters();

  return <SubmitScreenings allTheatersPromise={allTheaters} />;
}
