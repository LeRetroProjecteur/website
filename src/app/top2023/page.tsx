import {Suspense} from "react";

import SemaineAuCinema from "./top2023";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Sondage Top 2023 | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
    twitter: {
    card: "summary_large_image",
    title: "Generate Dynamic Open Graph and Twitter Images in Next.js",
    description:
      "A guide on how to optimize SEO with static and dynamic metatags using Next.js 13's new Metadata API.",
    images: [
      `https://firebasestorage.googleapis.com/v0/b/website-cine.appspot.com/o/images%2F$top2023.png?alt=media`,
    ],
  },
};

export default function SemaineAuCinemaPage() {
  return (
    <Suspense fallback={<></>}>
      <SemaineAuCinema />
    </Suspense>
  );
}