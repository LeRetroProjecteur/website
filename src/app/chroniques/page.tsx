import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import lumiereIcon from "./festival-lumiere-2023/img/icon.png";
import top2022 from "./top-2022/img/icon.png";

export const metadata: Metadata = {
  title: "Chroniques | Le Rétro Projecteur - Cinéma de patrimoine à Paris",
};

export default function Chroniques() {
  return (
    <>
      <h2>Chroniques</h2>
      <div className="post-grid">
        <div className="post">
          <Link href="chroniques/festival-lumiere-2023/">
            <Image
              width={274}
              height={150}
              className="post-icon"
              src={lumiereIcon}
              alt="Festival Lumière"
            />
          </Link>
          <p>
            <strong>
              <Link href="chroniques/festival-lumiere-2023/">
                Retour sur le Festival Lumière 2023
              </Link>
            </strong>
          </p>
          <p style={{ textAlign: "right" }}>
            <i>31 octobre, 2023</i>
          </p>
        </div>
        <div className="post">
          <Link href="chroniques/top-2022/">
            <Image
              width={274}
              height={150}
              className="post-icon"
              src={top2022}
              alt="Top 2022"
            />
          </Link>
          <p>
            <strong>
              <Link href="chroniques/top-2022/">
                Rétrospective 2022 – Nos meilleures séances patrimoine
              </Link>
            </strong>
          </p>
          <p style={{ textAlign: "right" }}>
            <i>2 janvier, 2023</i>
          </p>
        </div>
      </div>
    </>
  );
}
