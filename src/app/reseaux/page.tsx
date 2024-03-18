"use client";

import Link from "next/link";

import PageHeader from "@/components/layout/page-header";
import { TextBox } from "@/components/layout/text-boxes";
import { TwoColumnPage } from "@/components/layout/two-column-page";
import { SousTitre1 } from "@/components/typography/typography";

export default function SocialMediaPage() {
  return (
    <>
      <PageHeader text="Suivez-nous&nbsp;!">
        <SousTitre1>Nos réseaux sociaux</SousTitre1>
      </PageHeader>
      <TwoColumnPage left={<Left />} right={<Right color="retro-gray" />} />
    </>
  );
}

function Left() {
  return (
    <div className="pb-10px">
      Nous partageons régulièrement du contenu sur les réseaux sociaux&nbsp;–
      suivez-nous pour en savoir plus&nbsp;!
    </div>
  );
}

function Right({ color }: { color: "retro-gray" | "retro-black" }) {
  return (
    <div className="flex grow flex-col gap-y-12px pb-10px lg:gap-y-10px lg:pb-0 lg:pt-10px">
      <Link
        href="https://www.instagram.com/leretroprojecteur"
        target="_blank"
        className="items-center justify-center"
      >
        <TextBox textColor={color}>
          <div>instagram</div>
        </TextBox>
      </Link>
      <Link
        href="https://twitter.com/RetroProjecteur"
        target="_blank"
        className="items-center justify-center"
      >
        <TextBox textColor={color}>
          <div>twitter</div>
        </TextBox>
      </Link>
      <Link
        href="https://www.facebook.com/profile.php?id=100086988852803"
        target="_blank"
        className="items-center justify-center"
      >
        <TextBox textColor={color}>
          <div>Facebook</div>
        </TextBox>
      </Link>
    </div>
  );
}
