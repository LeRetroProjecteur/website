"use client";

import Link from "next/link";

import PageHeader from "@/components/layout/page-header";
import { TextBox } from "@/components/layout/text-boxes";
import { TwoColumnPage } from "@/components/layout/two-column-page";
import { BodyCopy, SousTitre1 } from "@/components/typography/typography";

export default function SocialMediaPage() {
  return (
    <>
      <PageHeader text="Suivez-nous&nbsp;!">
        <SousTitre1>Nos réseaux sociaux</SousTitre1>
      </PageHeader>
      <TwoColumnPage left={<Left />} right={<Right />} />
    </>
  );
}

function Left() {
  return (
    <div className="pb-20px lg:pb-0">
      <BodyCopy>
        Nous partageons régulièrement du contenu sur les réseaux sociaux&nbsp;–
        suivez-nous pour en savoir plus&nbsp;!
      </BodyCopy>
    </div>
  );
}

function Right() {
  return (
    <div className="flex grow flex-col gap-y-12px pb-10px lg:gap-y-10px lg:pb-0">
      <Link href="https://www.instagram.com/leretroprojecteur">
        <TextBox textColor={"retro-gray"}>
          <div>instagram</div>
        </TextBox>
      </Link>
      <Link href="https://twitter.com/RetroProjecteur">
        <TextBox textColor={"retro-gray"}>
          <div>twitter</div>
        </TextBox>
      </Link>
      <Link href="https://www.facebook.com/profile.php?id=100086988852803">
        <TextBox textColor={"retro-gray"}>
          <div>Facebook</div>
        </TextBox>
      </Link>
    </div>
  );
}
