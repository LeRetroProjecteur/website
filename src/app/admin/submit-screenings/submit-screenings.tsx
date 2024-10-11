"use client";

import React, { Fragment, Suspense, useState } from "react";

import { Results, TheaterSearchResults } from "@/app/recherche/recherche";
import RetroInput from "@/components/forms/retro-input";
import { SuspenseWithLoading } from "@/components/icons/loading";
import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";
import { SearchMovie } from "@/lib/types";

export default function SubmitScreenings({
  allMoviesPromise,
  allTheatersPromise,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
  allTheatersPromise: Promise<string[]>;
}) {
  const numSubmissions = 5;
  const handleCommentsChange = (
    event: React.ChangeEvent<{ value: string }>,
  ) => {
    setComments(event.target.value);
  };
  const [responseMessage, setResponseMessage] = useState("");
  const [rowsData, setRowsData] = useState(
    Array(numSubmissions).fill({ movie: "", date: "", time: "", note: "" }),
  );
  const [comments, setComments] = useState("");
  const [theater, setTheater] = useState("");

  const updateRowData = (
    index: number,
    data: { movie: string; date: string; time: string; note: string },
  ) => {
    const newRowsData = [...rowsData];
    newRowsData[index] = data;
    setRowsData(newRowsData);
  };

  return (
    <>
      <PageHeader text="Rajouter des séances">
        <SousTitre1>Votre salle</SousTitre1>
      </PageHeader>
      <div className="flex flex-col pb-10px lg:pl-20px">
        <strong>Cinema&nbsp;:</strong>
        <TheaterSearch
          allTheatersPromise={allTheatersPromise}
          onUpdate={setTheater}
        />
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
                sendScreeningsToDatabase(
                  theater,
                  rowsData,
                  comments,
                  setResponseMessage,
                )
              }
              className="border bg-retro-green p-15px text-16px"
            >
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

async function sendScreeningsToDatabase(
  theater_name: string,
  rowsData: { movie: string; date: string; time: string; note: string }[],
  comments: string,
  setResponseMessage: (message: string) => void,
) {
  try {
    const API_ENDPOINT =
      "https://europe-west1-website-cine.cloudfunctions.net/trigger_upload_data_to_db";

    // Transform the rowsData to the new format
    const transformedData = rowsData.map((row) => {
      const [year, month, day] = row.date.split("-").map(Number);
      const [hour, minute] = row.time.split(":").map(Number);

      return {
        movie: row.movie,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        notes: row.note,
      };
    });

    const payload = {
      collection_name: "raw-submit-screenings",
      theater_name: theater_name,
      include_time_in_doc_name: true,
      key_for_doc_name: "theater_name",
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
    date: string;
    time: string;
    note: string;
  }) => void;
}) {
  const [searchTerm, _setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const setSearchTerm = (st: string) => {
    _setSearchTerm(st);
    setShowResults(true);
    onUpdate({ movie: st, date, time, note });
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
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            onUpdate({ movie: searchTerm, date: e.target.value, time, note });
          }}
        />
      </td>
      <td className="py-5px" style={{ verticalAlign: "top" }}>
        <input
          type="time"
          id="time"
          name="time"
          className="flex h-42px grow lg:h-48px"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
            onUpdate({ movie: searchTerm, date, time: e.target.value, note });
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
            onUpdate({ movie: searchTerm, date, time, note: e.target.value });
          }}
        />
      </td>
    </tr>
  );
}

function TheaterSearch({
  allTheatersPromise,
  onUpdate,
}: {
  allTheatersPromise: Promise<string[]>;
  onUpdate: (theater: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearchTermChange = (st: string) => {
    setSearchTerm(st);
    setShowResults(true);
    onUpdate(st);
  };

  return (
    <div className="flex grow flex-col">
      <RetroInput
        value={searchTerm}
        setValue={handleSearchTermChange}
        leftAlignPlaceholder
        customTypography
        placeholder="Recherchez un cinéma..."
        transparentPlaceholder
        className="flex grow"
      />
      <Suspense fallback={<div>Loading...</div>}>
        {showResults && (
          <TheaterSearchResults
            extraClass="text-left px-5px py-2px border-x border-b"
            nb_results={5}
            searchTerm={searchTerm}
            allTheatersPromise={allTheatersPromise}
            onClick={(theater) => {
              handleSearchTermChange(theater);
              setShowResults(false);
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
