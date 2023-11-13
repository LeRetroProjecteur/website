import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

export default function Chroniques() {
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