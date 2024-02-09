import clsx from "clsx";
import Image from "next/image";
import { ReactNode, Suspense } from "react";

import loading from "../../assets/loading.gif";

export function Loading({
  className,
  grow,
}: {
  className?: string;
  grow?: boolean;
}) {
  return (
    <div
      className={clsx(
        className,
        { grow: grow ?? false },
        "flex items-center justify-center",
      )}
    >
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
  hideLoading,
  grow,
}: {
  className?: string;
  children?: ReactNode;
  hideLoading?: boolean;
  grow?: boolean;
}) {
  return (
    <Suspense
      fallback={
        hideLoading ?? false ? (
          <></>
        ) : (
          <Loading grow={grow} className={className} />
        )
      }
    >
      {children}
    </Suspense>
  );
}
