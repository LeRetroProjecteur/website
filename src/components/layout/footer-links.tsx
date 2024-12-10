"use client";

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
        <TextBox
          className={`text-${color} bg-retro-blue`}
          onClick={openNewsLetter}
        >
          <div>newsletter</div>
        </TextBox>
      </div>
      <div className="lg:hidden">
        <TextBox className={`text-${color} bg-retro-blue`} link="/newsletter">
          <div>newsletter</div>
        </TextBox>
      </div>
      <div className="hidden lg:block">
        <TextBox
          className={`text-${color}`}
          link="https://www.instagram.com/leretroprojecteur"
        >
          <div>instagram</div>
        </TextBox>
      </div>
      <div className="hidden lg:block">
        <TextBox
          className={`text-${color}`}
          link="https://twitter.com/RetroProjecteur"
        >
          <div>twitter</div>
        </TextBox>
      </div>
      <div className="lg:hidden">
        <TextBox className={`text-${color}`} link="/reseaux">
          <div>Suivez-nous !</div>
        </TextBox>
      </div>
    </div>
  );
}
