import { readdir } from "fs/promises";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import lumiereIcon from "./festival-lumiere-2023/img/icon.png";
import top2022 from "./top-2022/img/icon.png";
import top2023sondage from "./top-2023-sondage/img/icon.png";

export const metadata: Metadata = {
  title: "Chroniques | Le Rétro Projecteur — Cinéma de patrimoine à Paris",
};

const chroniques = [
  {
    titre: "Top 2023 – Vos plus belles découvertes de l'année",
    slug: "top-2023-sondage",
    image: top2023sondage,
    date: "22 décembre, 2023",
  },
  {
    titre: "Retour sur le Festival Lumière 2023",
    slug: "festival-lumiere-2023",
    image: lumiereIcon,
    date: "31 octobre, 2023",
  },
  {
    titre: "Top 2022 – Nos séances préférées de l'année",
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
    <>
      <h2>Chroniques</h2>
      <div className="post-grid">
        {chroniques.map(({ titre, slug, image, date }) => (
          <div className="post" key={slug}>
            <Link href={`chroniques/${slug}`}>
              <Image
                width={274}
                height={150}
                className="post-icon"
                src={image}
                alt={titre}
              />
            </Link>
            <p>
              <strong>
                <Link href={`chroniques/${slug}`}>{titre}</Link>
              </strong>
            </p>
            <p style={{ textAlign: "right" }}>
              <i>{date}</i>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
