import { ReactNode } from "react";

export function Titre({ children }: { children: ReactNode }) {
  return (
    <div className="font-degular text-5xl/8 font-black uppercase tracking-[0.01em] text-retro-gray lg:text-[95px] lg:leading-[60px]">
      {children}
    </div>
  );
}

export function SousTitre1({ children }: { children: ReactNode }) {
  return (
    <div className="text-xl/6 font-medium uppercase tracking-[-0.01em] text-retro-gray lg:text-[29px] lg:leading-[29px]">
      {children}
    </div>
  );
}

export function SousTitre2({ children }: { children: ReactNode }) {
  return (
    <div className="text-[25px] font-semibold uppercase leading-[25px] tracking-[-0.01em] text-retro-gray">
      {children}
    </div>
  );
}

export function SousTitre3({ children }: { children: ReactNode }) {
  return (
    <div className="text-[21px] font-semibold leading-[26px] text-retro-gray">
      {children}
    </div>
  );
}

export function ButtonCopy({ children }: { children: ReactNode }) {
  return (
    <div className="text-[20px] font-medium uppercase leading-[21px]">
      {children}
    </div>
  );
}

export function MetaCopy({ children }: { children: ReactNode }) {
  return (
    <div className="text-[20px] font-medium uppercase leading-[22px] text-retro-gray">
      {children}
    </div>
  );
}

export function BodyCopy({ children }: { children: ReactNode }) {
  return (
    <div className="text-[16px] font-medium leading-[20px] text-retro-black">
      {children}
    </div>
  );
}
