"use client";

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { closeMenu } from "@/lib/menu-store";

import logoCarre from "../../assets/logo-carre.png";
import FooterLinks from "../layout/footer-links";

export default function Menu() {
  return (
    <div className="flex flex-col gap-7 pb-7">
      <div className="flex grow flex-col">
        <div className="flex justify-center pb-4 pt-10">
          <div className="cursor-pointer" onClick={closeMenu}>
            <CloseIcon />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[245px]">
            <Image src={logoCarre} alt="logo" className="w-full" />
          </div>
        </div>
        <MenuLink>le rétro projecteur</MenuLink>
        <div className="flex flex-col">
          {[
            ["calendrier", "/"],
            ["actualité", "/actualite"],
            ["coups de coeur", "/coeur"],
            ["à propos", "/a-propos"],
            ["recherche", "/recherche"],
          ].map(([section, path]) => (
            <MenuLink key={section} path={path}>
              <Link href={path}>{section}</Link>
            </MenuLink>
          ))}
        </div>
      </div>
      <FooterLinks color="black" />
    </div>
  );
}

function MenuLink({ children, path }: { children: ReactNode; path?: string }) {
  const route = usePathname();
  return (
    <div
      className={classNames(
        "flex justify-center border-b border-retro-gray py-5",
        { "bg-retro-green": path === route },
      )}
    >
      <div className="grow whitespace-break-spaces text-center font-degular text-5xl font-extrabold uppercase text-retro-gray">
        {children}
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="28"
      height="29"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1.29289"
        y1="27.2216"
        x2="27.2929"
        y2="1.2216"
        stroke="#6A6A6D"
        strokeWidth="2"
      />
      <line
        x1="27.2929"
        y1="27.7071"
        x2="1.29289"
        y2="1.70711"
        stroke="#6A6A6D"
        strokeWidth="2"
      />
    </svg>
  );
}
