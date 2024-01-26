import clsx from "clsx";
import { ReactNode } from "react";

export function Titre({ children }: { children: ReactNode }) {
  return (
    <div className="font-degular text-51px font-black uppercase leading-none tracking-[0.01em] text-retro-gray lg:text-95px lg:leading-60px">
      {children}
    </div>
  );
}

export function SousTitre1({
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
        "text-21px font-semibold uppercase leading-25px tracking-[-0.01em] text-retro-gray lg:text-29px lg:font-medium lg:leading-31px",
      )}
    >
      {children}
    </div>
  );
}

export function SousTitre2({ children }: { children: ReactNode }) {
  return (
    <div className="text-21px font-semibold uppercase leading-25px tracking-normal text-retro-gray lg:text-25px lg:leading-25px lg:tracking-[-0.01em]">
      {children}
    </div>
  );
}

export function SousTitre3({ children }: { children: ReactNode }) {
  return (
    <div className="text-21px font-semibold leading-26px text-retro-gray">
      {children}
    </div>
  );
}

export function ButtonCopy({
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
        "text-15px font-medium uppercase leading-25px lg:text-20px lg:leading-21px",
      )}
    >
      {children}
    </div>
  );
}

export function MetaCopy({ children }: { children: ReactNode }) {
  return (
    <div className="text-19px font-medium uppercase leading-21px text-retro-gray lg:text-20px lg:leading-22px lg:tracking-[-0.01em]">
      {children}
    </div>
  );
}

export function CoeurCopy({ children }: { children: ReactNode }) {
  return (
    <div className="text-14px font-medium uppercase leading-16px tracking-[-0.01em] text-retro-gray lg:text-20px lg:leading-22px">
      {children}
    </div>
  );
}

export function FooterCopy({ children }: { children: ReactNode }) {
  return (
    <div className="text-19px font-medium uppercase leading-21px tracking-[-0.01em] text-retro-gray lg:text-20px lg:leading-24px">
      {children}
    </div>
  );
}

export function BodyCopy({
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
        "text-15px font-medium leading-18px text-retro-black lg:text-16px lg:leading-20px",
      )}
    >
      {children}
    </div>
  );
}
