import { cookies } from "next/headers";
import React from "react";

import { BetaContextProvider } from "./beta-context";

export async function BetaHandler({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();

  return (
    <BetaContextProvider
      isBeta={
        cookieStore.get("beta")?.value === "true" ||
        process.env.BETA_OVERRIDE === "true"
      }
    >
      {children}
    </BetaContextProvider>
  );
}
