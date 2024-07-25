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
  const [comments, setComments] = useState("");
  const handleCommentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComments(event.target.value);
  };
  const [responseMessage, setResponseMessage] = useState("");

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
        <div className="p-5px text-center">
          <form>
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
            <div className="flex flex-col items-center p-10px">
              <label htmlFor="comments">
                {" "}
                Avez-vous autre chose à signaler&nbsp;?
              </label>
              <textarea
                id="comments"
                value={comments}
                onChange={handleCommentsChange}
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
        <div className="flex items-center justify-center">
          <span>
            <button
                onClick={() =>
                    sendMoviesToFirestore(
                        inputs,
                        comments,
                        setResponseMessage,
                    )} className="border bg-retro-green p-15px text-16px">
              Rajoutez vos séances&nbsp;!
            </button>
              <p>
              <b>{responseMessage}</b>
            </p>
          </span>
        </div>
      </div>
    </>
  );
}

async function sendMoviesToFirestore(
  inputs,
    comments,
  setResponseMessage: (message: string) => void,
) {
  console.log(comments)
  try {
    const PROXY_URL = 'http://localhost:3000/';
    const response = await fetch(
        PROXY_URL +
      "https://europe-west1-website-cine.cloudfunctions.net/trigger_upload_data_to_db",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collection_name: "testing",
          doc_name: "test",
          key_for_doc_name: "doc_name",
          inputs: inputs,
          comments: comments,
        }),
        mode: 'cors',
      },
    );

    const responseText = await response.text(); // Get the raw response text
    console.log('Raw response:', responseText); // Log the raw response

    if (response.ok) {
      try {
        const data = JSON.parse(responseText);
        setResponseMessage(data.message || "Bien reçu, merci !");
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        setResponseMessage("Erreur lors du traitement de la réponse.");
      }
    } else {
      console.error('Error response:', responseText);
      setResponseMessage("Il y a eu une erreur, pouvez-vous vous réessayer ?");
    }
  } catch (error) {
    console.error('Fetch error:', error);
    setResponseMessage("Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.");
  }
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
            onChange={(e) => {}}
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
