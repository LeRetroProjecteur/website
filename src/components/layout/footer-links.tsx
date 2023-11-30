import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";

export default function FooterLinks({
  color,
  bigLineHeight,
}: {
  color: "gray" | "black";
  bigLineHeight: boolean;
}) {
  return (
    <div className="flex grow flex-col gap-y-3">
      <LinkBox color={color} bigLineHeight={bigLineHeight}>
        <Link href="/newsletter">newsletter</Link>
      </LinkBox>
      <LinkBox color={color} bigLineHeight={bigLineHeight}>
        <a href="https://www.instagram.com/leretroprojecteur">instagram</a>
      </LinkBox>
      <LinkBox color={color} bigLineHeight={bigLineHeight}>
        <a href="https://twitter.com/RetroProjecteur">twitter</a>
      </LinkBox>
    </div>
  );
}

function LinkBox({
  children,
  bigLineHeight,
  color,
}: {
  children: ReactNode;
  bigLineHeight: boolean;
  color: "gray" | "black";
}) {
  return (
    <div className="flex justify-center border border-retro-gray">
      <div
        className={classNames(
          "grow whitespace-break-spaces text-center text-xl font-medium uppercase  leading-10 lg:text-xl",
          {
            "text-retro-gray": color === "gray",
            "text-retro-black": color === "black",
            "py-1": bigLineHeight,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
}
