"use client";

import Image from "next/image";

import { openMenu } from "@/lib/menu-store";

import logoAnime from "../assets/logo-anime.gif";
import BurgerIcon from "./burger-icon";

export default function TopBar() {
  return (
    <div className="flex grow items-center relative pt-16">
      <div className="absolute cursor-pointer" onClick={openMenu}>
        <BurgerIcon />
      </div>
      <div className="grow flex justify-center">
        <Image src={logoAnime} alt="logo" className="w-52" />
      </div>
    </div>
  );
}
