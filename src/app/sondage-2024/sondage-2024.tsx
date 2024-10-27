"use client";

import React, { Fragment, useState } from "react";

import { SearchResults, TheaterSearchResults } from "@/app/recherche/recherche";
import RetroInput from "@/components/forms/retro-input";
import { SuspenseWithLoading } from "@/components/icons/loading";
import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";
import { SearchMovie, SearchTheater } from "@/lib/types";

export default function Sondage2024({
  allMoviesPromise,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
}) {
  const numSubmissions = 10;
  const handleCommentsChange = (
    event: React.ChangeEvent<{ value: string }>,
  ) => {
    setComments(event.target.value);
  };
  const [responseMessage, setResponseMessage] = useState("");
  const [rowsData, setRowsData] = useState(
    Array(numSubmissions).fill({
      movie: "",
      movie_id: "",
      date: "",
      note: "",
    }),
  );
  const [comments, setComments] = useState("");

  const updateRowData = (
    index: number,
    data: {
      movie: string;
      movie_id: string;
      date: string;
      note: string;
    },
  ) => {
    const newRowsData = [...rowsData];
    newRowsData[index] = data;
    setRowsData(newRowsData);
  };

  return (
      <>
        <PageHeader text="Sondage Top 2024">
          <SousTitre1>Votez pour vos meilleures découvertes de cinéma de patrimoine de 2024</SousTitre1>
        </PageHeader>
        <br/>
        <div className="flex flex-col pb-10px lg:pl-20px">
          <br/>
          <div className="p-5px text-center">
            <form>
              <table style={{width: "100%"}}>
                <thead>
                <tr>
                  <th style={{width: "40%"}}>Film</th>
                  <th style={{width: "10%"}}>Date</th>
                  <th style={{width: "50%"}}>Notes</th>
                </tr>
                </thead>
                <tbody>
                {rowsData.map((_, index) => (
                    <Fragment key={index}>
                      <ScreeningRow
                          allMoviesPromise={allMoviesPromise}
                          onUpdate={(data) => updateRowData(index, data)}
                      />
                    </Fragment>
                ))}
                </tbody>
              </table>
              <br/>
              <div className="flex flex-col items-center p-10px">
                <label htmlFor="comments">
                  {" "}
                  Un commentaire à nous partager&nbsp;?
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
          <br/>

          <div className="flex items-center justify-center">
          <span>
            <button
                onClick={() =>
                    sendScreeningsToDatabase(
                        rowsData,
                        comments,
                        setResponseMessage,
                    )
                }
                className="border bg-retro-green p-15px text-16px font-bold"
            >
              ENVOYEZ VOTRE TOP&nbsp;!
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

async function sendScreeningsToDatabase(
    rowsData: {
      movie: string;
      movie_id: string;
      date: string;
    note: string;
  }[],
  comments: string,
  setResponseMessage: (message: string) => void,
) {
  try {
    const API_ENDPOINT =
      "https://europe-west1-website-cine.cloudfunctions.net/trigger_upload_data_to_db";

    // Transform the rowsData to the new format
    const transformedData = rowsData.map((row) => {
      const [year, month, day] = row.date.split("-").map(Number);

      // Check if any required field is missing or NaN
      if (!(row.movie == "" || isNaN(year) || isNaN(month) || isNaN(day))) {
        return {
          movie: row.movie,
          id: row.movie_id,
          year: year,
          month: month,
          day: day,
          notes: row.note,
        };
      }
    });

    const payload = {
      collection_name: "sondage-2024",
      include_time_in_doc_name: true,
      key_for_doc_name: "theater_id",
      showtimes: transformedData,
      comments: comments,
    };

    console.log("Sending payload:", JSON.stringify(payload, null, 2));
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      mode: "cors",
    });
    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      JSON.stringify(Object.fromEntries(response.headers), null, 2),
    );

    const responseText = await response.text();
    console.log("Raw response:", responseText);

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${responseText}`,
      );
    }

    setResponseMessage("Données envoyées avec succès!");
  } catch (error) {
    console.error("Fetch error:", error);
    if (error instanceof Error) {
      setResponseMessage(
        `Erreur de connexion: ${error.message}. Veuillez vérifier votre connexion internet et réessayer.`,
      );
    } else {
      setResponseMessage(
        "Une erreur inconnue est survenue. Veuillez vérifier votre connexion internet et réessayer.",
      );
    }
  }
}

function ScreeningRow({
  allMoviesPromise,
  onUpdate,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
  onUpdate: (data: {
    movie: string;
    movie_id: string;
    date: string;
    note: string;
  }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieId, setMovieId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const setSearchFind = (st: string, id: string = "") => {
    setSearchTerm(st);
    setMovieId(id);
    setShowResults(true);
    onUpdate({ movie: st, movie_id: id, date, note });
  };

  return (
    <tr style={{ backgroundColor: "var(--white)" }}>
      <td className="py-5px">
        <div className={"flex grow flex-col"}>
          <RetroInput
            value={searchTerm}
            setValue={(st) => setSearchFind(st)}
            leftAlignPlaceholder
            customTypography
            placeholder="Recherchez un film..."
            transparentPlaceholder
            className={"flex grow"}
          />
          <SuspenseWithLoading hideLoading={searchTerm.length === 0}>
            {showResults && (
              <SearchResults
                extraClass="text-left px-5px py-2px border-x border-b"
                nbResults={5}
                searchTerm={searchTerm}
                allDataPromise={allMoviesPromise}
                onClick={(movie) => {
                  setSearchFind(
                    movie.title +
                      ", " +
                      movie.directors +
                      " (" +
                      movie.year +
                      ")",
                    movie.id,
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
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            onUpdate({
              movie: searchTerm,
              movie_id: movieId,
              date: e.target.value,
              note,
            });
          }}
        />
      </td>
      <td className="flex grow py-5px">
        <input
          name="note"
          type="text"
          className="flex h-42px grow lg:h-48px"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            onUpdate({
              movie: searchTerm,
              movie_id: movieId,
              date,
              note: e.target.value,
            });
          }}
        />
      </td>
    </tr>
  );
}
