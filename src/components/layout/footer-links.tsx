"use client";

import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

import { openNewsLetter } from "@/lib/newsletter-store";

export default function FooterLinks({ color }: { color: "gray" | "black" }) {
  return (
    <div className="flex grow flex-col gap-y-12px lg:gap-y-10px lg:pt-10px">
      <div className="hidden lg:block">
        <LinkBox color={color} bgGreen>
          <a className="cursor-pointer" onClick={openNewsLetter}>
            newsletter
          </a>
        </LinkBox>
      </div>
      <div className="lg:hidden">
        <LinkBox color={color} bgGreen>
          <Link href={"/newsletter"}>newsletter</Link>
        </LinkBox>
      </div>
      <LinkBox color={color}>
        <a href="https://www.instagram.com/leretroprojecteur" target="_blank">
          instagram
        </a>
      </LinkBox>
      <LinkBox color={color}>
        <a href="https://twitter.com/RetroProjecteur" target="_blank">
          twitter
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
      className={clsx("h-42px flex items-center justify-center border", {
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
