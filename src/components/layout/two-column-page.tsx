import clsx from "clsx";
import { ReactNode } from "react";

export function TwoColumnPage({
  left,
  right,
  children,
  narrow,
}: {
  left: ReactNode;
  right: ReactNode;
  children?: ReactNode;
  narrow?: boolean;
}) {
  return (
    <div className="flex grow justify-center">
      <div
        className={clsx("flex grow flex-col lg:pl-20px", {
          "max-w-[32rem] lg:max-w-none": narrow,
        })}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col lg:w-1/2 lg:border-r lg:pr-20px">
            {left}
          </div>
          <div className="flex flex-col lg:w-1/2 lg:pl-20px">{right}</div>
        </div>
        {children}
        <div className="min-h-100px w-1/2 grow border-r" />
      </div>
    </div>
  );
}
