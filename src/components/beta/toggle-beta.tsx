"use server";

import { cookies } from "next/headers";

import { Beta, Feature, getBeta } from "./beta-handler";

async function setBetaCookie(beta: Beta) {
  const cookieStore = await cookies();
  cookieStore.set("beta", JSON.stringify(beta), {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function toggleBetaMode() {
  const beta = getBeta(await cookies());
  await setBetaCookie({ ...beta, showBetaUi: !beta.showBetaUi });
}

export async function toggleFeature(feature: Feature) {
  const beta = getBeta(await cookies());
  await setBetaCookie({
    ...beta,
    features: { ...beta.features, [feature]: !beta.features[feature] },
  });
}
