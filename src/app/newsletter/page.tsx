import { Metadata } from "next";

import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";

import NewsletterPage from "./newsletter";

export const metadata: Metadata = {
  title: "Newsletter | Le Rétro Projecteur - Cinéma de patrimoine à Paris",
};

export default function AProposPage() {
  return (
    <>
      <PageHeader text="«&nbsp;Up Close&nbsp;»">
        <SousTitre1>
          Abonnez-vous à notre newsletter hebdomadaire&nbsp;!
        </SousTitre1>
      </PageHeader>
      <NewsletterPage />
    </>
  );
}
