import clsx from "clsx";
import { ReactNode } from "react";

export default function FixedHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "z-20 flex flex-col bg-white lg:sticky lg:top-0 lg:pb-20px lg:pt-20px",
      )}
    >
      {children}
    </div>
  );
}
