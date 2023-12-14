import {Suspense} from "react";

import SemaineAuCinema from "./top2023";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Sondage Top 2023 | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
    twitter: {
        card: "summary_large_image",
        title: "Sondage Top 2023 | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
        description:
          "Sondage Top 2023 | Le Rétro Projecteur – Cinéma de patrimoine à Paris.",
        images: [
          `https://firebasestorage.googleapis.com/v0/b/website-cine.appspot.com/o/images%2Ftop2023.png?alt=media`,
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