"use client";

import clsx from "clsx";
import { ReactNode } from "react";

export function TextBox({
  children,
  className,
  link,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  link?: {
    url: string;
    newTab?: boolean;
  };
  onClick?: () => void;
}) {
  if (!onClick && link) {
    if (link.newTab) {
      onClick = () => window.open(link.url, "_blank");
    } else {
      onClick = () => (window.location.href = link.url);
    }
  }
  return (
    <div
      className={clsx(
        "flex grow items-center justify-center whitespace-break-spaces border px-10px py-9px text-center text-20px font-medium uppercase leading-21px",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
