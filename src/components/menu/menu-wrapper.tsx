"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import Menu from "@/components/menu/menu";
import { useMenuStore } from "@/lib/menu-store";
import { useIsMobile } from "@/lib/utils";

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
      <div className="relative mx-auto max-w-1800px lg:static lg:flex lg:items-start">
        <motion.div
          className="absolute left-0 z-10 hidden min-h-screen w-full bg-white lg:sticky lg:top-0 lg:flex lg:w-max lg:p-20px lg:pr-0"
          animate={
            isDesktop || isMenuOpen
              ? { translateX: 0, display: "flex" }
              : { translateX: "-100%", display: "none" }
          }
          transition={{
            duration: wasMenuOpen.current !== isMenuOpen ? 0.2 : 0,
          }}
        >
          <Menu />
        </motion.div>
        <motion.div
          className="absolute left-0 flex min-h-screen w-full grow px-10px sm:px-15px lg:static lg:px-20px lg:pl-0"
          transition={{
            duration: wasMenuOpen.current !== isMenuOpen ? 0.2 : 0,
          }}
          animate={
            isDesktop || !isMenuOpen
              ? { translateX: 0, display: "flex" }
              : { translateX: "100%", display: "none" }
          }
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
