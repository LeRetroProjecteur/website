import clsx from "clsx";
import { ReactNode } from "react";

export function Titre({ children }: { children: ReactNode }) {
  return (
    <div className="font-degular font-black uppercase tracking-[0.01em] text-retro-gray lg:text-95px lg:leading-60px">
      {children}
    </div>
  );
}

export function SousTitre1({ children }: { children: ReactNode }) {
  return (
    <div className="font-medium uppercase tracking-[-0.01em] text-retro-gray lg:text-29px lg:leading-31px">
      {children}
    </div>
  );
}

export function SousTitre2({ children }: { children: ReactNode }) {
  return (
    <div className="font-semibold uppercase tracking-[-0.01em] text-retro-gray lg:text-25px lg:leading-25px">
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
        "text-20px font-medium uppercase leading-21px",
      )}
    >
      {children}
    </div>
  );
}

export function MetaCopy({ children }: { children: ReactNode }) {
  return (
    <div className="text-20px font-medium uppercase leading-22px text-retro-gray">
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
        "text-16px font-medium leading-20px text-retro-black",
      )}
    >
      {children}
    </div>
  );
}
