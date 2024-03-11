"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, ReactNode, useCallback } from "react";

import PageHeader from "@/components/layout/page-header";
import { TwoColumnPage } from "@/components/layout/two-column-page";
import { SousTitre1 } from "@/components/typography/typography";
import { useCalendrierStore } from "@/lib/calendrier-store";
import { closeMenu } from "@/lib/menu-store";

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
  const pathName = usePathname();

  const closeMenuIfOnSamePathname = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      useCalendrierStore.getState().reset();
      let anchor: EventTarget | null = e.target;
      while (
        anchor != null &&
        anchor instanceof Node &&
        !(anchor instanceof HTMLAnchorElement)
      ) {
        anchor = anchor.parentElement;
      }

      if (
        anchor != null &&
        (anchor as HTMLAnchorElement).href != null &&
        (anchor as HTMLAnchorElement).href.endsWith(pathName)
      ) {
        closeMenu();
      }
    },
    [pathName],
  );

  return (
    <div className="flex grow flex-col gap-y-12px pb-10px lg:gap-y-10px lg:pb-0 lg:pt-10px">
      <Link
        href="https://www.instagram.com/leretroprojecteur"
        target="_blank"
        onClick={closeMenuIfOnSamePathname}
        className="items-center justify-center"
      >
        <LinkBox color="black">
          <div className="px-4 py-3">
            {" "}
            {/* Adjust padding as needed */}
            instagram
          </div>
        </LinkBox>
      </Link>
      <Link
        href="https://twitter.com/RetroProjecteur"
        target="_blank"
        onClick={closeMenuIfOnSamePathname}
        className="items-center justify-center"
      >
        <LinkBox color="black">
          <div className="px-4 py-3">
            {" "}
            {/* Adjust padding as needed */}
            twitter
          </div>
        </LinkBox>
      </Link>
      <Link
        href="https://www.facebook.com/profile.php?id=100086988852803"
        target="_blank"
        onClick={closeMenuIfOnSamePathname}
        className="items-center justify-center"
      >
        <LinkBox color="black">
          <div className="px-4 py-3">
            {" "}
            {/* Adjust padding as needed */}
            Facebook
          </div>
        </LinkBox>
      </Link>
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
