"use client";

import classNames from "classnames";

import Menu from "@/components/menu/menu";
import { useMenuStore } from "@/lib/menu-store";

export default function MenuWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMenuOpen = useMenuStore((s) => s.isOpen);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-hidden">
      <div
        className={classNames(
          "flex min-h-screen w-full grow px-4 transition-transform",
          { "-translate-x-full": !isMenuOpen, absolute: !isMenuOpen },
        )}
      >
        <Menu></Menu>
      </div>
      <div
        className={classNames(
          "flex min-h-screen w-full grow px-4 transition-transform",
          { "translate-x-full": isMenuOpen, absolute: isMenuOpen },
        )}
      >
        {children}
      </div>
    </div>
  );
}
