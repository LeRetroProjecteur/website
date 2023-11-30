import { readdir } from "fs/promises";
import { Metadata } from "next";

import PageHeader from "@/components/layout/page-header";

import lumiereIcon from "./festival-lumiere-2023/img/icon.png";
import top2022 from "./top-2022/img/icon.png";

export const metadata: Metadata = {
  title: "Chroniques | Le Rétro Projecteur — Cinéma de patrimoine à Paris",
};

const chroniques = [
  {
    titre: "Retour sur le Festival Lumière 2023",
    slug: "festival-lumiere-2023",
    image: lumiereIcon,
    date: "31 octobre, 2023",
  },
  {
    titre: "Rétrospective 2022 — Nos meilleures séances patrimoine",
    slug: "top-2022",
    image: top2022,
    date: "2 janvier, 2023",
  },
];

export default async function Chroniques() {
  const numChroniques = (
    await readdir("./src/app/chroniques", { withFileTypes: true })
  ).filter((dirent) => dirent.isDirectory()).length;
  if (chroniques.length !== numChroniques) {
    throw new Error(
      `Il y a ${numChroniques} chroniques, mais il y a ${chroniques.length} liens sur la page chroniques.`,
    );
  }

  return (
    <div className="flex grow flex-col">
      <div className="flex">
        <PageHeader text="chroniques" />
      </div>
    </div>
  );
}
