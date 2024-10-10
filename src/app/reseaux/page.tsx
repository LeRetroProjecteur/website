import { Metadata } from "next";

import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";

import SocialMedia from "./reseaux";

export const metadata: Metadata = {
  title: "Réseaux sociaux",
  description: "Suivez-nous sur les réseaux sociaux",
};

export default function SocialMediaPage() {
  return (
    <>
      <PageHeader text="Suivez-nous&nbsp;!">
        <SousTitre1>Nos réseaux sociaux</SousTitre1>
      </PageHeader>
      <SocialMedia />
    </>
  );
}
