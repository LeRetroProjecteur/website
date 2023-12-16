import { handleIfNoneMatch } from "@/lib/etag";
import { getBallots } from "@/lib/movies";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const ballots = await getBallots();
  return handleIfNoneMatch(request, ballots);
}
