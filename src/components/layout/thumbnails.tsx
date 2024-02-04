import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { MetaCopy } from "@/components/typography/typography";
import { blurProps } from "@/lib/util";

export function ThumbnailCopy({
  link,
  image,
  alt,
  width,
  height,
  children,
}: {
  link: string;
  image: StaticImageData | string;
  alt: string;
  width?: number;
  height?: number;
  children: ReactNode;
}) {
  return (
    <Link href={link}>
      <div className="flex flex-col gap-10px">
        <Image
          className="width-1200 height-675 h-auto w-full"
          src={image}
          alt={alt}
          width={width}
          height={height}
          {...blurProps}
        />
        <div className="gap-10px lg:flex-row lg:gap-20px">
          <MetaCopy>{children}</MetaCopy>
        </div>
      </div>
    </Link>
  );
}

export function ThumbnailGridCopy({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-thumbnails-sm gap-15px lg:grid-cols-thumbnails-lg lg:gap-20px">
      {children}
    </div>
  );
}
