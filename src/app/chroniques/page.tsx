import Image from "next/image";

import lumiereIcon from "./festival-lumiere-2023/img/icon.png";
import top2022 from "./top-2022/img/icon.png";

export default function Chroniques() {
  return (
    <>
      <h2>Chroniques</h2>
      <div className="post-grid">
        <div className="post">
          <a href="chroniques/festival-lumiere-2023/">
            <Image
              width={274}
              height={150}
              className="post-icon"
              src={lumiereIcon}
              alt="Festival Lumière"
            />
          </a>
          <p>
            <strong>
              <a href="chroniques/festival-lumiere-2023/">
                Retour sur le Festival Lumière 2023
              </a>
            </strong>
          </p>
          <p style={{ textAlign: "right" }}>
            <i>31 octobre, 2023</i>
          </p>
        </div>
        <div className="post">
          <a href="chroniques/top-2022/">
            <Image
              width={274}
              height={150}
              className="post-icon"
              src={top2022}
              alt="Top 2022"
            />
          </a>
          <p>
            <strong>
              <a href="chroniques/top-2022/">
                Rétrospective 2022 – Nos meilleures séances patrimoine
              </a>
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
