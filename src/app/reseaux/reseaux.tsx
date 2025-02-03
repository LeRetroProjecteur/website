"use client";

import { TwoColumnPage } from "@/components/layout/page";
import { TextBox } from "@/components/layout/text-boxes";
import { BodyCopy } from "@/components/typography/typography";

export default function SocialMedia() {
  return <TwoColumnPage left={<Description />} right={<Links />} />;
}

function Description() {
  return (
    <div className="pb-20px lg:pb-0">
      <BodyCopy>
        Nous partageons régulièrement du contenu sur les réseaux sociaux&nbsp;–
        suivez-nous pour en savoir plus&nbsp;!
      </BodyCopy>
    </div>
  );
}

function Links() {
  return (
    <div className="flex grow flex-col gap-y-12px pb-10px lg:gap-y-10px lg:pb-0">
      {[
        { url: "https://letterboxd.com/retroprojecteur", text: "Letterboxd" },
        {
          url: "https://www.instagram.com/leretroprojecteur",
          text: "Instagram",
        },
        { url: "https://twitter.com/RetroProjecteur", text: "Twitter" },
        {
          url: "https://www.facebook.com/profile.php?id=100086988852803",
          text: "Facebook",
        },
      ].map((social) => (
        <TextBox key={social.url} link={{ url: social.url, newTab: true }}>
          <div>{social.text}</div>
        </TextBox>
      ))}
    </div>
  );
}
