import clsx from "clsx";
import Image from "next/image";
import { ReactNode, Suspense } from "react";

import loading from "../../assets/loading.gif";

export function Loading({ className }: { className?: string }) {
  return (
    <div className={clsx(className, "flex items-center justify-center")}>
      <Image
        src={loading}
        alt="loading"
        className="max-h-full w-auto max-w-full"
      />
    </div>
  );
}

export function SuspenseWithLoading({
  className,
  children,
  showLoading,
}: {
  className?: string;
  children?: ReactNode;
  showLoading?: boolean;
}) {
  return (
    <Suspense
      fallback={
        showLoading ?? false ? <Loading className={className} /> : <></>
      }
    >
      {children}
    </Suspense>
  );
}
