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
    <div className="relative h-screen w-full overflow-x-hidden">
      <div
        className={classnames(
          "absolute flex h-screen w-full grow px-4 transition-transform",
          { "-translate-x-full": !isMenuOpen },
        )}
      >
        <Menu></Menu>
      </div>
      <div
        className={classnames(
          "absolute flex h-screen w-full grow px-4 transition-transform",
          { "translate-x-full": isMenuOpen },
        )}
      >
        {children}
      </div>
    </div>
  );
}
