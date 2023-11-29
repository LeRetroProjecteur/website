"use client";

import Image from "next/image";

import { openMenu } from "@/lib/menu-store";

import logoAnime from "../assets/logo-anime.gif";
import BurgerIcon from "./burger-icon";

export default function TopBar() {
  return (
    <div className="relative flex grow items-center pt-16">
      <div className="absolute cursor-pointer" onClick={openMenu}>
        <BurgerIcon />
      </div>
      <div className="flex grow justify-center">
        <Image src={logoAnime} alt="logo" className="w-52" />
      </div>
    </div>
  );
}
