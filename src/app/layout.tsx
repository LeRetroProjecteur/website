import { GoogleTagManager } from "@next/third-parties/google";
import clsx from "clsx";
import type { Metadata } from "next";
import localFont from "next/font/local";

import Footer from "@/components/layout/footer";
import TopBar from "@/components/layout/top-bar";
import MenuWrapper from "@/components/menu/menu-wrapper";

import "./globals.css";

const degular = localFont({
  src: "../assets/DegularVariable.ttf",
  variable: "--font-degular",
});

const suisse = localFont({
  src: [
    {
      path: "../assets/SuisseIntl-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/SuisseIntl-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/SuisseIntl-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-suisse",
});

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
      <body
        className={clsx(
          degular.variable,
          suisse.variable,
          "font-suisse text-retro-black",
        )}
      >
        <MenuWrapper>
          <div className="flex grow flex-col gap-6 pt-16 lg:pt-0">
            <div className="flex lg:hidden">
              <TopBar />
            </div>
            <div className="flex grow flex-col justify-between">
              <div className="flex">{children}</div>
              <div className="flex pb-7">
                <Footer />
              </div>
            </div>
          </div>
        </MenuWrapper>
      </body>
      <GoogleTagManager gtmId="G-F5QY5F8S5L" />
    </html>
  );
}
