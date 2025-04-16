import { Quartier } from "@/lib/calendrier-store";

const QUARTIERS: [string, Quartier][] = [
  ["rive gauche", Quartier.RG],
  ["rive droite", Quartier.RD],
  ["extramuros", Quartier.EM],
];

const QUARTIERS_MARSEILLE: [string, Quartier][] = [
  ["marseille", Quartier.Marseille],
  ["aix-en-provence", Quartier.Aix_en_Provence],
  ["etang-de-berre", Quartier.Etang_de_Berre],
  ["aubagne", Quartier.Aubagne],
];

export { QUARTIERS, QUARTIERS_MARSEILLE };
