"use client";

import { createContext, useContext } from "react";
import React from "react";

import { checkNotNull } from "@/lib/utils";

import { BetaClientSideHandler } from "./beta-client-side-handler";
import { Beta } from "./beta-handler";

const BetaContext = createContext<Beta | undefined>(undefined);

export function useBeta() {
  return checkNotNull(useContext(BetaContext));
}

export function BetaContextProvider({
  beta,
  children,
}: {
  beta: Beta;
  children: React.ReactNode;
}) {
  return (
    <BetaContext.Provider value={beta}>
      <BetaClientSideHandler />
      {children}
    </BetaContext.Provider>
  );
}
