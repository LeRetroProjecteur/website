"use client";

import { AnimatePresence, motion } from "framer-motion";

import Menu from "@/components/menu/menu";
import { useMenuStore } from "@/lib/menu-store";

export default function MenuWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMenuOpen = useMenuStore((s) => s.isOpen);

  return (
    <>
      <div className="relative lg:hidden">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute left-0 flex min-h-screen w-full px-4"
              animate={{ translateX: 0 }}
              initial={{ translateX: "-100%" }}
              exit={{ translateX: "-100%" }}
              transition={{ duration: 0.2 }}
            >
              <Menu></Menu>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {!isMenuOpen && (
            <motion.div
              className="absolute left-0 flex min-h-screen w-full grow px-4"
              transition={{ duration: 0.2 }}
              animate={{ translateX: 0 }}
              initial={{ translateX: "100%" }}
              exit={{ translateX: "100%" }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="hidden p-4 lg:flex">
        <div className="flex w-72">
          <Menu></Menu>
        </div>
        <div className="flex grow">{children}</div>
      </div>
    </>
  );
}
