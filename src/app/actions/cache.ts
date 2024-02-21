"use server";

import { revalidatePath } from "next/cache";

export async function clearCoeurCache() {
  revalidatePath("/coeur");
}
