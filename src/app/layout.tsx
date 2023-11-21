import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";

import Footer from "./(footer)/footer";
import Header from "./(header)/header";
import "./globals.css";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Calendrier | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
  description:
    "Venez découvrir toutes les ressorties de films dans les salles parisiennes.",
  metadataBase: new URL("https://leretroprojecteur.com/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleTagManager gtmId="G-F5QY5F8S5L" />
    </html>
  );
}
