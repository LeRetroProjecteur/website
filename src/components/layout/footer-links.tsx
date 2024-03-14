"use client";

import Link from "next/link";

import { TextBox } from "@/components/layout/text-boxes";
import { openNewsLetter } from "@/lib/newsletter-store";

export default function FooterLinks({
  color,
}: {
  color: "retro-gray" | "retro-black";
}) {
  return (
    <div className="flex grow flex-col gap-y-12px lg:gap-y-10px lg:pt-10px">
      <div className="hidden lg:block">
        <TextBox textColor={color} bgColor={"retro-blue"}>
          <a className="cursor-pointer" onClick={openNewsLetter}>
            newsletter
          </a>
        </TextBox>
      </div>
      <div className="lg:hidden">
        <TextBox textColor={color} bgColor={"retro-blue"}>
          <Link href={"/newsletter"}>newsletter</Link>
        </TextBox>
      </div>
      <TextBox textColor={color}>
        <a href="https://www.instagram.com/leretroprojecteur" target="_blank">
          instagram
        </a>
      </TextBox>
      <TextBox textColor={color}>
        <a href="https://twitter.com/RetroProjecteur" target="_blank">
          twitter
        </a>
      </TextBox>
    </div>
  );
}
