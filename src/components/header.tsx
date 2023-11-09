import Image from "next/image";

import MovieSearch from "@/components/movie-search";
import { getMovies } from "@/lib/movies";

import logo from "./logo.png";

export default function Header() {
  const movies = getMovies();

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <a href="/subscribe.html">
          Abonnez-vous à notre newsletter hebdomadaire&nbsp;!
        </a>
      </div>
      <p style={{ margin: "7px" }}></p>
      <MovieSearch moviesPromise={movies} />
      <p style={{ margin: "10px" }}></p>
      <div id="logo-wrap" className="center">
        <a href="/">
          <Image
            height={168}
            width={375}
            src={logo}
            alt="Le Rétro Projecteur – Cinéma de patrimoine à Paris"
            className="center"
            style={{ display: "block" }}
          />
        </a>
      </div>
      <p style={{ margin: "7px" }}></p>
      <div id="outer">
        <div className="menu-item">
          <a href="/">Calendrier</a> •&nbsp;
        </div>
        <div className="menu-item">
          <a href="/chroniques">Chroniques</a> •&nbsp;
        </div>
        <div className="menu-item">
          <a href="/coeur">Coups de cœur</a>
        </div>
      </div>
      <hr />
    </>
  );
}
