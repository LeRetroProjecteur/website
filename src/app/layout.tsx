import { GoogleTagManager } from "@next/third-parties/google";
import clsx from "clsx";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode, StrictMode } from "react";

import Footer from "@/components/layout/footer";
import TopBar from "@/components/layout/top-bar";
import MenuWrapper from "@/components/menu/menu-wrapper";

import "./globals.css";

const degular = localFont({
  src: "../assets/DegularVariable.woff2",
  variable: "--font-degular",
});

const suisse = localFont({
  src: [
    {
      path: "../assets/SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/SuisseIntl-Book.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/SuisseIntl-Medium.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-suisse",
});

export const metadata: Metadata = {
  title: "Calendrier | Le Rétro Projecteur - Cinéma de patrimoine à Paris",
  description:
    "Venez découvrir toutes les ressorties de films dans les salles parisiennes.",
  metadataBase: new URL("https://leretroprojecteur.com/"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StrictMode>
      <html lang="fr" className="h-screen overflow-y-auto">
        <body
          className={clsx(
            degular.variable,
            suisse.variable,
            "font-suisse text-retro-black",
          )}
        >
          <MenuWrapper>
            <div className="pt-25px flex grow flex-col lg:pt-0">
              <div className="pb-20px flex lg:hidden">
                <TopBar />
              </div>
              <div className="flex grow flex-col justify-between">
                <div className="flex">{children}</div>
                <div className="lg:pb-20px lg:pl-20px lg:pt-20px flex">
                  <Footer />
                </div>
              </div>
            </div>
          </MenuWrapper>
        </body>
        <GoogleTagManager gtmId="G-F5QY5F8S5L" />
      </html>
    </StrictMode>
  );
}
