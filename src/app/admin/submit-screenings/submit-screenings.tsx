"use client";

import React, { Fragment, useState } from "react";

import { Results } from "@/app/recherche/recherche";
import RetroInput from "@/components/forms/retro-input";
import { SuspenseWithLoading } from "@/components/icons/loading";
import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";
import { SearchMovie } from "@/lib/types";

export default function SubmitScreenings({
  allMoviesPromise,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
}) {
  const numSubmissions = 5;
  const inputs = Array.from(Array(numSubmissions).keys());

  return (
    <>
      <PageHeader text="Rajouter des séances">
        <SousTitre1>Votre salle : Le Méliès Montreuil</SousTitre1>
      </PageHeader>
      <div className="flex grow flex-col pb-10px lg:pl-20px">
        <strong>Instructions&nbsp;:</strong>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
        <br />
        <br />
        <div style={{ textAlign: "center", padding: "5px" }}>
          <form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            ></div>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Film</th>
                  <th style={{ width: "10%" }}>Date</th>
                  <th style={{ width: "5%" }}>Horaire</th>
                  <th style={{ width: "45%" }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {inputs.map((k) => (
                  <Fragment key={k}>
                    <SearchRow allMoviesPromise={allMoviesPromise} />
                  </Fragment>
                ))}
              </tbody>
            </table>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                alignItems: "center",
              }}
            >
              <label htmlFor="comments">
                {" "}
                Avez-vous autre chose à signaler&nbsp;?
              </label>
              <textarea
                value=""
                rows={5}
                style={{
                  fontSize: "15px",
                  wordWrap: "break-word",
                  width: "min(95%, 400px)",
                  height: "100px",
                  padding: "5px",
                }}
              />
            </div>
          </form>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>
            <button
              style={{
                fontSize: "16px",
                padding: "15px",
                backgroundColor: "#E2FF46",
                color: "black",
                border: "solid",
                borderColor: "black",
                cursor: "pointer",
              }}
            >
              Rajoutez vos séances&nbsp;!
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

function SearchRow({
  allMoviesPromise,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
}) {
  const [searchTerm, _setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const setSearchTerm = (st: string) => {
    _setSearchTerm(st);
    setShowResults(true);
  };
  return (
    <tr style={{ backgroundColor: "var(--white)" }}>
      <td className="py-5px">
        <div className={"flex grow flex-col"}>
          <RetroInput
            value={searchTerm}
            setValue={setSearchTerm}
            leftAlignPlaceholder
            customTypography
            placeholder="Recherchez un film..."
            transparentPlaceholder
            className={"flex grow"}
          />
          <SuspenseWithLoading hideLoading={searchTerm.length === 0}>
            {showResults && (
              <Results
                extraClass="text-left px-5px py-2px border-x border-b"
                nb_results={5}
                {...{ searchTerm, allMoviesPromise }}
                onClick={(movie) => {
                  setSearchTerm(
                    movie.title +
                      ", " +
                      movie.directors +
                      " (" +
                      movie.year +
                      ")",
                  );
                  setShowResults(false);
                }}
              />
            )}
          </SuspenseWithLoading>
        </div>
      </td>
      <td className="py-5px" style={{ verticalAlign: "top" }}>
        <input
          type="date"
          id="date"
          name="date"
          className="flex h-42px grow lg:h-48px"
        />
      </td>
      <td className="py-5px" style={{ verticalAlign: "top" }}>
        <input
          type="time"
          id="time"
          name="time"
          className="flex h-42px grow lg:h-48px"
        />
      </td>
      <td className="flex grow py-5px">
        <input type="text" className="flex h-42px grow lg:h-48px" />
      </td>
    </tr>
  );
}
