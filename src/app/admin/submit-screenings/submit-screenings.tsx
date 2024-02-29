"use client";

import React, {Fragment } from "react";
import PageHeader from "@/components/layout/page-header";
import {SousTitre1} from "@/components/typography/typography";
import { SearchMovie } from "@/lib/types";
import RetroInput from "@/components/forms/retro-input";
import {Results} from "@/components/search/search";

const cineID = "cine-club-ens";

interface screening {
  film: string;
  day: number;
  hour: number;
  id: string;
  minute: number;
  month: number;
  notes: string;
  year: number;
}

export default function SubmitScreenings({
  allMoviesPromise,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
}) {

  const numSubmissions = 10;
  const inputs = Array.from(Array(numSubmissions).keys())

  return (
    <>
      <PageHeader text="Rajouter des séances" >
        <SousTitre1>Ciné-Club ENS</SousTitre1>
      </PageHeader>
      <div className="flex grow flex-col pb-10px lg:pl-20px">
        <strong>Instructions&nbsp;:</strong>
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum.
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
            >
            </div>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Film</th>
                  <th>Date</th>
                  <th>Horaire</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {inputs.map((k) => (
                  <Fragment key={k}>
                    <tr style={{ backgroundColor: "var(--white)" }}>
                      <td>
                        <div className={"flex grow flex-col"}>
                          <RetroInput
                            value=""
                            setValue=""
                            placeholder="Recherchez un film..."
                            transparentPlaceholder
                            className={"flex grow"}
                          />
                          <Results nb_results={5} allMoviesPromise={allMoviesPromise} searchTerm={""} />
                        </div>
                      </td>
                      <td>
                        <input type="date" id="date" name="date" />
                      </td>
                      <td>
                        <input type="time" id="time" name="time" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
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
                backgroundColor: "var(--red)",
                color: "white",
                border: "0 none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Envoyez vos séances&nbsp;!
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

async function sendNameToFirestore(
  screeningsList: screening[],
  comments: string,
  setResponseMessage: (message: string) => void,
) {
  const response = await fetch(
    "https://europe-west1-website-cine.cloudfunctions.net/create_http_function_with_dictionnary_request",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collection_name: "raw-submissions",
        key_for_doc_name: cineID,
        showtimes: screeningsList,
        comments: comments,
      }),
    },
  );
  if (response.ok) {
    setResponseMessage("Bien reçu, merci !");
  } else {
    setResponseMessage("Il y a eu une erreur, pouvez-vous vous réessayer ?");
  }
}
