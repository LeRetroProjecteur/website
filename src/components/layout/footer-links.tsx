import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";

export default function FooterLinks({ color }: { color: "gray" | "black" }) {
  return (
    <div className="flex flex-col gap-y-3">
      <LinkBox color={color}>
        <Link href="/newsletter">newsletter</Link>
      </LinkBox>
      <LinkBox color={color}>
        <a href="https://www.instagram.com/leretroprojecteur">instagram</a>
      </LinkBox>
      <LinkBox color={color}>
        <a href="https://twitter.com/RetroProjecteur">twitter</a>
      </LinkBox>
    </div>
  );
}

function LinkBox({
  children,
  color,
}: {
  children: ReactNode;
  color: "gray" | "black";
}) {
  return (
    <div className="border-retro-gray flex justify-center border py-3">
      <div
        className={classNames(
          "grow whitespace-break-spaces text-center text-sm font-medium uppercase",
          {
            "text-retro-gray": color === "gray",
            "text-retro-black": color === "black",
          },
        )}
      >
        {children}
      </div>
    </div>
  );
}
