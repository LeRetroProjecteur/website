import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface BannerProps {
  children: ReactNode;
  speed?: number;
}

const Banner: React.FC<BannerProps> = ({ children, speed = 50 }) => {
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      const singleContentWidth = contentRef.current.offsetWidth;
      setContentWidth(singleContentWidth);
    }
  }, [children]);

  useEffect(() => {
    if (contentWidth > 0) {
      const duration = contentWidth / speed;
      controls.start({
        x: -contentWidth,
        transition: {
          duration,
          repeat: Infinity,
          ease: "linear",
        },
      });
    }
  }, [contentWidth, speed, controls]);

  return (
    <Link
      href={"/ma-retro-2024"}
      className="absolute top-0 z-50 w-full lg:fixed"
    >
      <div
        ref={containerRef}
        className="m-auto overflow-hidden border-b bg-retro-blue py-9px text-20px font-medium uppercase leading-21px text-retro-gray"
      >
        <motion.div
          className="flex whitespace-nowrap uppercase"
          animate={controls}
        >
          <div key={1} ref={contentRef} className="inline-flex">
            {children}
          </div>
          <div key={2} ref={contentRef} className="inline-flex">
            {children}
          </div>
          <div key={3} ref={contentRef} className="inline-flex">
            {children}
          </div>
          <div key={4} ref={contentRef} className="inline-flex">
            {children}
          </div>
          <div key={5} ref={contentRef} className="inline-flex">
            {children}
          </div>
        </motion.div>
      </div>
    </Link>
  );
};

export default Banner;
