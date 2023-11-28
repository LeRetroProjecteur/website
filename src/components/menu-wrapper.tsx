"use client";

import classnames from "classnames";

import Menu from "@/components/menu";
import { useMenuStore } from "@/lib/menu-store";

export default function MenuWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMenuOpen = useMenuStore((s) => s.isOpen);

  return (
    <div className="relative overflow-x-hidden w-full h-screen">
      <div
        className={classnames(
          "absolute h-screen w-full grow flex transition-transform px-4",
          { "-translate-x-full": !isMenuOpen },
        )}
      >
        <Menu></Menu>
      </div>
      <div
        className={classnames(
          "absolute h-screen w-full grow flex transition-transform px-4",
          { "translate-x-full": isMenuOpen },
        )}
      >
        {children}
      </div>
    </div>
  );
}
