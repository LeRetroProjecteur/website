import { Metadata } from "next";

import Recherche from "./recherche";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Recherche",
  description: "Recherchez un film qui passe en salle à Paris",
};

export default function RecherchePage() {
  return <Recherche />;
}
