import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import React from "react";
import { z } from "zod";

import { BetaContextProvider } from "./beta-context";

const _features = z.enum(["seanceDialog"] as const);
const betaSchema = z.object({
  features: z.record(_features, z.boolean()),
  showBetaUi: z.boolean(),
});
export type Beta = z.infer<typeof betaSchema>;
export type Feature = z.infer<typeof _features>;
export const features = _features.Values;

const defaultBeta: Beta =
  process.env.NODE_ENV === "development"
    ? { features: { seanceDialog: true }, showBetaUi: true }
    : {
        features: { seanceDialog: true },
        showBetaUi: false,
      };

export function getBeta(cookieStore: ReadonlyRequestCookies) {
  return (
    betaSchema.safeParse(JSON.parse(cookieStore.get("beta")?.value ?? "{}"))
      .data ?? defaultBeta
  );
}

export async function BetaHandler({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();

  return (
    <BetaContextProvider beta={getBeta(cookieStore)}>
      {children}
    </BetaContextProvider>
  );
}
