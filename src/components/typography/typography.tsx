import clsx from "clsx";
import { ReactNode } from "react";

export function Titre({ children }: { children: ReactNode }) {
  return (
    <div className="lg:text-95px text-51px lg:leading-60px font-degular font-black uppercase leading-none tracking-[0.01em] text-retro-gray">
      {children}
    </div>
  );
}

export function SousTitre1({ children }: { children: ReactNode }) {
  return (
    <div className="text-21px leading-25px lg:text-29px lg:leading-31px font-semibold uppercase tracking-[-0.01em] text-retro-gray lg:font-medium">
      {children}
    </div>
  );
}

export function SousTitre2({ children }: { children: ReactNode }) {
  return (
    <div className="text-21px lg:text-25px lg:leading-25px font-semibold uppercase tracking-normal text-retro-gray lg:tracking-[-0.01em]">
      {children}
    </div>
  );
}

export function SousTitre3({ children }: { children: ReactNode }) {
  return (
    <div className="text-21px leading-26px font-semibold text-retro-gray">
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
        "lg:text-20px lg:leading-21px text-15px leading-25px font-medium uppercase",
      )}
    >
      {children}
    </div>
  );
}

export function MetaCopy({ children }: { children: ReactNode }) {
  return (
    <div className="text-19px leading-21px lg:text-20px lg:leading-22px font-medium uppercase tracking-[-0.01em] text-retro-gray">
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
        "text-15px leading-18px lg:text-16px lg:leading-20px font-medium text-retro-black",
      )}
    >
      {children}
    </div>
  );
}
