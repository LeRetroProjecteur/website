"use server";

import { cookies } from "next/headers";

export async function setBetaMode() {
  const cookieStore = await cookies();
  if (cookieStore.get("beta")?.value === "true") {
    cookieStore.delete("beta");
  } else {
    cookieStore.set("beta", "true", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 365,
    });
  }
}
