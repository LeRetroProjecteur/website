import { Metadata } from "next";

import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";

import MaRetro2024 from "./ma-retro-2024";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ma Rétrospective 2024",
  description: "Votez pour vos plus belles découvertes cinéma de l'année !",
};

export default function SubmitScreeningsPage() {
  return (
    <>
      <PageHeader text="Ma Rétro 2024">
        <SousTitre1>Votez pour vos plus belles découvertes&nbsp;!</SousTitre1>
      </PageHeader>
      <MaRetro2024 />
    </>
  );
}
