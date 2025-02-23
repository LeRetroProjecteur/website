"use client";

import { createContext, useContext } from "react";
import React from "react";

import { BetaClientSideHandler } from "./beta-client-side-handler";

const BetaContext = createContext<boolean>(false);

export function useIsBetaMode() {
  return useContext(BetaContext);
}

export function BetaContextProvider({
  isBeta,
  children,
}: {
  isBeta: boolean;
  children: React.ReactNode;
}) {
  return (
    <BetaContext.Provider value={isBeta}>
      <BetaClientSideHandler />
      {children}
    </BetaContext.Provider>
  );
}
