"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import Menu from "@/components/menu/menu";
import { useMenuStore } from "@/lib/menu-store";
import { useIsMobile } from "@/lib/util";

export default function MenuWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMenuOpen = useMenuStore((s) => s.isOpen);
  const wasMenuOpen = useRef(isMenuOpen);

  useEffect(() => {
    wasMenuOpen.current = isMenuOpen;
  }, [isMenuOpen]);

  const isDesktop = !useIsMobile();

  return (
    <>
      <div className="relative lg:static lg:flex lg:p-4">
        <motion.div
          className="absolute left-0 z-10 hidden min-h-screen w-full bg-white px-4 lg:static lg:flex lg:w-72 lg:px-0"
          animate={
            isDesktop || isMenuOpen
              ? { translateX: 0, display: "flex" }
              : { translateX: "-100%", display: "hidden" }
          }
          transition={{
            duration: wasMenuOpen.current !== isMenuOpen ? 0.2 : 0,
          }}
        >
          <Menu></Menu>
        </motion.div>
        <motion.div
          className="absolute left-0 flex min-h-screen w-full grow px-4 lg:static lg:px-0"
          transition={{
            duration: wasMenuOpen.current !== isMenuOpen ? 0.2 : 0,
          }}
          animate={
            isDesktop || !isMenuOpen
              ? { translateX: 0, display: "flex" }
              : { translateX: "100%", display: "hidden" }
          }
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
