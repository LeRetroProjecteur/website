import React, {Suspense} from "react";

import SemaineAuCinema from "./top2023";
import {Metadata} from "next";
import Head from "next/head";

export const metadata: Metadata = {
    title: "Sondage Top 2023 | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
};

export default function SemaineAuCinemaPage() {
  return (
    <Suspense fallback={
        <>
        <div>
            <Head>
              <link rel="icon" type="image/png" href="/img/icon.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Sondage Top 2023" />
              <meta name="twitter:description" content="Votez pour vos meilleures découvertes de cinéma de patrimoine de l'année !" />
              <meta name="twitter:image" content="https://leretroprojecteur.com/src/app/top2023/img/icon.png" />
              <meta property="og:title" content="Sondage Top 2023" />
              <meta property="og:description" content="Votez pour vos meilleures découvertes de cinéma de patrimoine de l'année !" />
              <meta property="og:image" content="https://leretroprojecteur.com/src/app/top2023/img/icon.png" />
            </Head>
        </div>
        </>
    }>
      <SemaineAuCinema />
    </Suspense>
    );
}