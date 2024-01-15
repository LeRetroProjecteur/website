"use client";

import { useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";

import MovieSearch from "./movie-search";

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

export default function SubmitScreenings() {
  useSearchParams();
  const [weekHtml, setWeekHtml] = useState("");
  const weekHtmlRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (weekHtml !== weekHtmlRef?.current?.innerHTML ?? "") {
      setWeekHtml(weekHtmlRef?.current?.innerHTML ?? "");
    }
  });

  const nb_submissions = 10;
  const inputs: Array<keyof screening> = Array.from(
    Array(nb_submissions).keys(),
  )
    .map((i) => i.toString())
    .map((int) => int as keyof screening);

  const [responseMessage, setResponseMessage] = useState("");
  const [cineID, setCineID] = useState("");
  const handleCineIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCineID(event.target.value);
  };
  const [comments, setComments] = useState("");
  const handleCommentsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComments(event.target.value);
  };

  const [screeningsList, setScreeningsList] = useState<screening[]>(
    Array(inputs.length).fill({
      day: 0,
      hour: 0,
      id: "",
      minute: 0,
      month: 0,
      notes: "",
      year: 0,
    }),
  );
  const handleSearchTermChange = (index: number, term: string) => {
    setScreeningsList((prevScreeningsList) => {
      const newScreeningsList = [...prevScreeningsList];
      newScreeningsList[index]["id"] = term;
      return newScreeningsList;
    });
  };
  console.log(screeningsList);

  return (
    <>
      <h1>Soumettres des séances supplémentaires</h1>
      <br />
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
            <span>
              <input
                type="text"
                placeholder="ID du cinéma..."
                value={cineID}
                onChange={handleCineIDChange}
                style={{
                  marginBottom: "10px",
                  width: "200px",
                  padding: "5px",
                  border: "1px solid var(--black)",
                }}
              />
            </span>
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
              {inputs.map((k, i) => (
                <Fragment key={k}>
                  <tr style={{ backgroundColor: "var(--white)" }}>
                    <td>
                      <MovieSearch
                        onSearchTermChange={(term) =>
                          handleSearchTermChange(i, term)
                        }
                      />
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
              value={comments}
              rows={5}
              style={{
                fontSize: "15px",
                wordWrap: "break-word",
                width: "min(95%, 400px)",
                height: "100px",
                padding: "5px",
              }}
              onChange={handleCommentsChange}
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
            onClick={() =>
              sendNameToFirestore(
                cineID,
                screeningsList,
                comments,
                setResponseMessage,
              )
            }
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
          <p>
            <b>{responseMessage}</b>
          </p>
        </span>
      </div>
    </>
  );
}

async function sendNameToFirestore(
  cineID: string,
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
        theater_id: cineID,
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
