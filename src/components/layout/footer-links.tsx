import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

export default function FooterLinks({
  color,
}: {
  color: "gray" | "black";
  newsletterGreen?: boolean;
}) {
  return (
    <div className="gap-y-12px lg:gap-y-10px flex grow flex-col">
      <LinkBox color={color} bgGreen>
        <Link href="/newsletter">newsletter</Link>
      </LinkBox>
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
      className={clsx("py-14px lg:py-9px flex justify-center border", {
        "bg-retro-green": bgGreen ?? false,
      })}
    >
      <div
        className={clsx("grow whitespace-break-spaces text-center", {
          "text-retro-gray": color === "gray",
          "text-retro-black": color === "black",
        })}
      >
        <div className="text-20px leading-21px uppercase lg:font-semibold">
          {children}
        </div>
      </div>
    </div>
  );
}
