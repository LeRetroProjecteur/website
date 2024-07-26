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
                {rowsData.map((_, index) => (
                  <Fragment key={index}>
                    <SearchRow
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
                sendMoviesToFirestore(rowsData, comments, setResponseMessage)
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

async function sendMoviesToFirestore(
  rowsData: { movie: string; date: string; time: string; note: string }[],
  comments: string,
  setResponseMessage: (message: string) => void,
) {
  try {
    const PROXY_URL =
      process.env.NEXT_PUBLIC_PROXY_URL || "http://localhost:3000/";
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
    const response = await fetch("/api/trigger-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collection_name: "raw-submit-screenings",
        doc_name: "le-melies",
        include_time_in_doc_name: true,
        key_for_doc_name: "doc_name",
        showtimes: transformedData,
        comments: comments,
      }),
    });
    const responseText = await response.text(); // Get the raw response text
    console.log("Raw response:", responseText); // Log the raw response
  } catch (error) {
    console.error("Fetch error:", error);
    setResponseMessage(
      "Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.",
    );
  }
}

function SearchRow({
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
