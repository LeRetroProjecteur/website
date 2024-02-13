import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { MetaCopy } from "@/components/typography/typography";
import { blurProps } from "@/lib/util";

export function ThumbnailWithBlurb({
  link,
  image,
  children,
}: {
  link: string;
  image:
    | { src: StaticImageData; alt: string; width?: number; height?: number }
    | { src: string; alt: string; width: number; height: number };
  children: ReactNode;
}) {
  return (
    <Link href={link}>
      <div className="flex flex-col gap-10px">
        <Image
          className="h-auto w-full"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          {...blurProps}
        />
        <div className="gap-10px lg:flex-row lg:gap-20px">
          <MetaCopy>{children}</MetaCopy>
        </div>
      </div>
    </Link>
  );
}

export function ThumbnailGrid({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="grid grid-cols-thumbnails-sm gap-15px border-b pb-15px lg:grid-cols-thumbnails-lg lg:gap-20px lg:border-0">
        {children}
      </div>
      <div className="min-h-100px w-1/2 grow border-r lg:hidden" />
    </>
  );
}
