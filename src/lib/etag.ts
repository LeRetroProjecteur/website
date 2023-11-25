import { createHash } from "crypto";
import stringify from "fast-json-stable-stringify";

export function handleIfNoneMatch(request: Request, body: object) {
  const etag = createHash("md5")
    .update(Buffer.from(stringify(body)))
    .digest()
    .toString("hex");

  if (request.headers.get("if-none-match") === etag) {
    return new Response(undefined, { status: 304 });
  }

  return Response.json(body, {
    headers: {
      cacheControl: "no-cache",
      etag,
    },
  });
}
