import { Metadata } from "next";

import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";

import MaRetro2025 from "./ma-retro-2025";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ma Rétrospective 2025",
  description: "Votez pour vos plus belles découvertes cinéma de l'année !",
};

export default function SubmitScreeningsPage() {
  return (
    <>
      <PageHeader text="Ma Rétro 2025">
        <SousTitre1>Votez pour vos plus belles découvertes&nbsp;!</SousTitre1>
      </PageHeader>
      <MaRetro2025 />
    </>
  );
}
