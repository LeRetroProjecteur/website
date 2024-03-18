"use client";

import Link from "next/link";

import { TextBox } from "@/components/layout/text-boxes";

export default function FooterLinks({
  color,
}: {
  color: "retro-gray" | "retro-black";
}) {
  return (
    <div className="flex grow flex-col gap-y-12px lg:gap-y-10px lg:pt-10px">
      <div className="hidden lg:block">
        <Link href={"/newsletter"}>
          <TextBox textColor={color} bgColor="retro-blue">
            <div>newsletter</div>
          </TextBox>
        </Link>
      </div>
      <div className="lg:hidden">
        <Link href={"/newsletter"}>
          <TextBox textColor={color} bgColor="retro-blue">
            <div>newsletter</div>
          </TextBox>
        </Link>
      </div>
      <div className="hidden lg:block">
        <Link href="https://www.instagram.com/leretroprojecteur">
          <TextBox textColor={color}>
            <div>instagram</div>
          </TextBox>
        </Link>
      </div>
      <div className="hidden lg:block">
        <Link href="https://twitter.com/RetroProjecteur">
          <TextBox textColor={color}>
            <div>twitter</div>
          </TextBox>
        </Link>
      </div>
      <div className="lg:hidden">
        <Link href={"/reseaux"}>
          <TextBox textColor={color}>
            <div>Suivez-nous !</div>
          </TextBox>
        </Link>
      </div>
    </div>
  );
}
