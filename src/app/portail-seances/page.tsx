import { Metadata } from "next";

import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";
import { getTheaters } from "@/lib/theaters";

import SubmitScreenings from "./portail-seances";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portail Séances",
};

export default function SubmitScreeningsPage() {
  const allTheaters = getTheaters();

  return (
    <>
      <PageHeader text="Portail séances">
        <SousTitre1>Rajouter des séances à notre calendrier</SousTitre1>
      </PageHeader>
      <SubmitScreenings allTheatersPromise={allTheaters} />
    </>
  );
}
