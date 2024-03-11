import clsx from "clsx";
import { Metadata } from "next";
import { ReactNode } from "react";

import PageHeader from "@/components/layout/page-header";
import { TwoColumnPage } from "@/components/layout/two-column-page";
import { SousTitre1 } from "@/components/typography/typography";

export const metadata: Metadata = {
  title: "Réseaux sociaux | Le Rétro Projecteur - Cinéma de patrimoine à Paris",
};

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
    <div className="pb-10px">
      Nous partageons régulièrement du contenu sur les réseaux sociaux&nbsp;–
      suivez-nous pour en savoir plus&nbsp;!
    </div>
  );
}
function Right() {
  return (
    <div className="flex grow flex-col gap-y-12px pb-10px lg:gap-y-10px lg:pb-0 lg:pt-10px">
      <LinkBox color="black">
        <a href="https://www.instagram.com/leretroprojecteur" target="_blank">
          instagram
        </a>
      </LinkBox>
      <LinkBox color="black">
        <a href="https://twitter.com/RetroProjecteur" target="_blank">
          twitter
        </a>
      </LinkBox>
      <LinkBox color="black">
        <a
          href="https://www.facebook.com/profile.php?id=100086988852803"
          target="_blank"
        >
          Facebook
        </a>
      </LinkBox>
    </div>
  );
}

function LinkBox({
  children,
  color,
  bgGreen,
}: {
  children: ReactNode;
  color: "gray" | "black";
  bgGreen?: boolean;
}) {
  return (
    <div
      className={clsx("flex h-42px items-center justify-center border", {
        "bg-retro-green": bgGreen ?? false,
      })}
    >
      <div
        className={clsx("grow whitespace-break-spaces text-center", {
          "text-retro-gray": color === "gray",
          "text-retro-black": color === "black",
        })}
      >
        <div className="text-20px font-medium uppercase leading-21px">
          {children}
        </div>
      </div>
    </div>
  );
}
