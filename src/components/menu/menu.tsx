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
  [<>chroniques</>, "/chroniques"],
  [
    <>
      coups
      <br />
      de coeur
    </>,
    "/coeur",
  ],
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
      if ((e.target as HTMLAnchorElement).href.endsWith(pathName)) {
        useCalendrierStore.getState().reset();
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
    <div className="lg:pr-20px px-15px flex grow flex-col lg:justify-between lg:border-r lg:pl-0">
      <div className="flex grow flex-col lg:grow-0">
        <div className="py-18px flex justify-center lg:hidden">
          <div className="cursor-pointer" onClick={closeMenu}>
            <CloseIcon />
          </div>
        </div>
        <div className="pb-18px flex justify-center lg:pb-0">
          <Link href="/" onClick={onClickLogo}>
            <Image
              src={logoCarre}
              alt="logo"
              className="lg:w-207px w-250px h-auto"
            />
          </Link>
        </div>
        <MenuLink>
          <div className="pb-16px text-44px leading-29px lg:py-3px lg:text-35px lg:leading-25px font-degular font-extrabold uppercase tracking-[0.01em] text-retro-gray">
            le rétro
            <br />
            projecteur
          </div>
        </MenuLink>
        <div className="flex flex-col">
          {menu.map(([section, path]) => (
            <MenuLink key={path} path={path} className="py-16px">
              <div className="text-44px lg:text-32px leading-29px lg:leading-25px font-degular font-extrabold uppercase text-retro-gray">
                <Link href={path} onClick={closeMenuIfOnSamePathname}>
                  {section}
                </Link>
              </div>
            </MenuLink>
          ))}
        </div>
      </div>
      <div className="pb-28px flex lg:pb-0">
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
      className={clsx(className, "lg:py-12px flex justify-center border-b", {
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
    <svg
      className="h-29px w-28px stroke-retro-gray"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1.29289"
        y1="27.2216"
        x2="27.2929"
        y2="1.2216"
        strokeWidth="2"
      />
      <line
        x1="27.2929"
        y1="27.7071"
        x2="1.29289"
        y2="1.70711"
        strokeWidth="2"
      />
    </svg>
  );
}
