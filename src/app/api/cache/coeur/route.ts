import { revalidatePath } from "next/cache";

export async function DELETE(_request: Request) {
  revalidatePath("/coeur");

  return new Response();
}
