import clsx from "clsx";
import { ReactNode } from "react";

import { Titre } from "../typography/typography";

export default function PageHeader({
  children,
  className,
  text,
}: {
  children?: ReactNode;
  className?: string;
  text: ReactNode;
}) {
  return (
    <FixedHeader>
      <div>
        <div className="grow whitespace-break-spaces border-y bg-retro-green py-14px text-center lg:w-max lg:whitespace-nowrap lg:border-0 lg:bg-white lg:py-0 lg:pl-20px lg:text-left">
          <Titre>{text}</Titre>
        </div>
      </div>
      {children && (
        <div className={clsx(className, "lg:pt-20px")}>
          <div className="flex items-center justify-center border-b py-14px text-center lg:justify-start lg:border-t lg:bg-retro-green lg:pl-20px lg:pr-10px lg:text-start">
            {children}
          </div>
        </div>
      )}
    </FixedHeader>
  );
}

export function FixedHeader({
  children,
  className,
  disableBelowPadding,
}: {
  children: ReactNode;
  className?: string;
  disableBelowPadding?: boolean;
}) {
  return (
    <div
      className={clsx(
        className,
        {
          "pb-20px": !(disableBelowPadding ?? false),
        },
        "z-20 flex flex-col bg-white lg:sticky lg:top-[40.5px] lg:pt-20px",
      )}
    >
      {children}
    </div>
  );
}
