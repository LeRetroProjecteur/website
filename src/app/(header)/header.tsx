import Image from "next/image";
import Link from "next/link";

import MovieSearch from "@/app/(header)/movie-search";

import logo from "./logo.png";

export default function Header() {
  return (
    <>
      <div
        className="center"
        style={{ textAlign: "center", background: "var(--red)" }}
      >
        <Link href="/top2023" style={{ color: "var(--white)" }}>
          Top 2023&nbsp;: Participez à notre sondage&nbsp;!
        </Link>
        <p></p>
        {/*<Link href="/subscribe">*/}
        {/*  Abonnez-vous à notre newsletter hebdomadaire&nbsp;!*/}
        {/*</Link>*/}
      </div>
      <p style={{ margin: "7px" }}></p>
      <MovieSearch />
      <p style={{ margin: "10px" }}></p>
      <div id="logo-wrap" className="center">
        <Link href="/">
          <Image
            height={168}
            width={375}
            src={logo}
            alt="Le Rétro Projecteur – Cinéma de patrimoine à Paris"
            className="center"
            style={{ display: "block" }}
          />
        </Link>
      </div>
      <p style={{ margin: "7px" }}></p>
      <div id="outer">
        <div className="menu-item">
          <Link href="/">Calendrier</Link> •&nbsp;
        </div>
        <div className="menu-item">
          <Link href="/chroniques">Chroniques</Link> •&nbsp;
        </div>
        <div className="menu-item">
          <Link href="/coeur">Coups de cœur</Link>
        </div>
      </div>
      <hr />
    </>
  );
}
