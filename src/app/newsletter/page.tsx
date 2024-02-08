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
      <PageHeader text="newsletter">
        <SousTitre1 className="text-center lg:text-left">
          up close, la newsletter du rétro
        </SousTitre1>
      </PageHeader>
      <NewsletterPage />
    </>
  );
}
