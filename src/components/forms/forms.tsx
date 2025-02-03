import { StaticImageData } from "next/image";
import { ReactNode } from "react";

import PageHeader from "@/components/layout/page-header";
import {
  SousTitre1,
} from "@/components/typography/typography";

import { ThreeColumnPage } from "../layout/page";

export function ArticleLayout({
  info,
  children,
}: {
  info: {
    title: string;
    type: string;
    icon: StaticImageData;
    date: string;
  };
  children?: ReactNode;
}) {
  return (
    <>
      <PageHeader text="actualités">
        <SousTitre1>{info.title}</SousTitre1>
      </PageHeader>
      <ThreeColumnPage header={info}>{children}</ThreeColumnPage>
    </>
  );
}