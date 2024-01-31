"use client";

import { usePrevious } from "@uidotdev/usehooks";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, ReactNode, useCallback, useEffect } from "react";

import { useCalendrierStore } from "@/lib/calendrier-store";
import { closeMenu } from "@/lib/menu-store";

import logoCarre from "../../assets/logo-carre.png";
import FooterLinks from "../layout/footer-links";

const menu: [JSX.Element, string][] = [
  [<>calendrier</>, "/"],
  [<>actualités</>, "/actualites"],
  [<>coups de coeur</>, "/coeur"],
  [<>à propos</>, "/a-propos"],
  [<>recherche</>, "/recherche"],
];

export default function Menu() {
  const pathName = usePathname();
  const oldPathName = usePrevious(pathName);

  useEffect(() => {
    if (oldPathName != null && oldPathName !== pathName) {
      closeMenu();
    }
  }, [oldPathName, pathName]);

  const closeMenuIfOnSamePathname = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      useCalendrierStore.getState().reset();
      if ((e.target as HTMLAnchorElement).href.endsWith(pathName)) {
        closeMenu();
      }
    },
    [pathName],
  );

  const onClickLogo = useCallback(() => {
    useCalendrierStore.getState().reset();
    closeMenu();
  }, []);

  return (
    <div className="flex grow flex-col px-15px lg:justify-between lg:border-r lg:pl-0 lg:pr-20px">
      <div className="flex grow flex-col lg:grow-0">
        <div className="flex justify-center py-18px lg:hidden">
          <div className="cursor-pointer" onClick={closeMenu}>
            <CloseIcon />
          </div>
        </div>
        <Link href="/" onClick={onClickLogo}>
          <div className="flex justify-center pb-18px lg:pb-0">
            <Image
              src={logoCarre}
              alt="logo"
              className="h-auto w-250px lg:w-207px"
            />
          </div>
          <MenuLink>
            <div className="pb-16px font-degular text-44px font-extrabold uppercase leading-29px tracking-[0.01em] text-retro-gray lg:py-3px lg:text-35px lg:leading-25px">
              le rétro
              <br />
              projecteur
            </div>
          </MenuLink>
          <div className="hidden" />
        </Link>
        <div className="flex flex-col">
          {menu.map(([section, path]) => (
            <MenuLink key={path} path={path} className="py-16px">
              <div className="font-degular text-44px font-extrabold uppercase leading-29px text-retro-gray lg:text-32px lg:leading-25px">
                <Link href={path} onClick={closeMenuIfOnSamePathname}>
                  {section}
                </Link>
              </div>
            </MenuLink>
          ))}
        </div>
      </div>
      <div className="flex pb-28px pt-15px lg:pb-0">
        <FooterLinks color="black" />
      </div>
    </div>
  );
}

function MenuLink({
  children,
  path,
  className,
}: {
  children: ReactNode;
  path?: string;
  className?: string;
}) {
  const route = usePathname();
  return (
    <div
      className={clsx(className, "flex justify-center border-b lg:py-12px", {
        "bg-retro-green": path === route,
      })}
    >
      <div className="w-min grow whitespace-break-spaces text-center">
        {children}
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 38 38" className="h-38px w-38px stroke-retro-gray">
      <line
        y1="-1"
        x2="49.3883"
        y2="-1"
        transform="matrix(0.708302 -0.705909 0.708302 0.705909 2.18164 37.1544)"
        strokeWidth="2"
      />
      <line
        y1="-1"
        x2="49.3883"
        y2="-1"
        transform="matrix(-0.708302 -0.705909 0.708302 -0.705909 37.1636 35.9091)"
        strokeWidth="2"
      />
    </svg>
  );
}
