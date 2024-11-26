"use client";

import html2canvas from "html2canvas";
import React, { Fragment, useState } from "react";

import { SearchResults } from "@/app/recherche/recherche";
import RetroInput from "@/components/forms/retro-input";
import { SuspenseWithLoading } from "@/components/icons/loading";
import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";
import { SearchMovie } from "@/lib/types";

interface RowData {
  movie: string;
  movie_id: string;
  note: string;
}

interface ShareableContentProps {
  rowsData: RowData[];
  fullName: string;
}
function ShareableContent({ rowsData, fullName }: ShareableContentProps) {
  return (
    <div id="shareableContent" className="hidden">
      <div
        className="max-w-2xl rounded-lg bg-retro-green p-8 shadow-lg"
        style={{ minWidth: "600px" }}
      >
        <h2 className="mb-6 text-center text-2xl font-bold">
          Mon Top Films 2024
        </h2>
        {fullName && <p className="mb-6 text-center text-lg">Par {fullName}</p>}
        <div className="space-y-4">
          {rowsData
            .filter((row) => row.movie !== "")
            .map((row, index) => (
              <div key={index} className="rounded-lg bg-white p-4 shadow">
                <div className="flex items-start">
                  <div className="relative flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-retro-green">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-lg font-bold">{row.movie}</div>
                    {row.note && (
                      <div className="mt-2 text-sm italic text-gray-700">
                        {row.note}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

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
      note: "",
    }),
  );
  const [comments, setComments] = useState("");
  const [fullName, setFullName] = useState("");

  const updateRowData = (
    index: number,
    data: {
      movie: string;
      movie_id: string;
      note: string;
    },
  ) => {
    const newRowsData = [...rowsData];
    newRowsData[index] = data;
    setRowsData(newRowsData);
  };

  const handleShare = async () => {
    try {
      const element = document.getElementById("shareableContent");
      if (!element) return;

      // Make element visible for capturing
      element.classList.remove("hidden");

      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2, // Higher resolution
        useCORS: true,
        logging: true,
        width: 600,
        height: element.scrollHeight,
      });

      // Hide element again
      element.classList.add("hidden");

      // Convert canvas to blob with proper typing
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((result) => {
          if (result) {
            resolve(result);
          }
        }, "image/png"),
      );

      if (!blob) throw new Error("Failed to create image");

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mon-top-2024.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setResponseMessage("Screenshot téléchargé avec succès!");
    } catch (error) {
      console.error("Error taking screenshot:", error);
      setResponseMessage("Erreur lors de la capture. Veuillez réessayer.");
    }
  };

  return (
    <>
      <PageHeader text="Sondage Top 2024">
        <SousTitre1>
          Votez pour vos meilleures découvertes de cinéma de patrimoine de 2024
        </SousTitre1>
      </PageHeader>
      <br />
      <div className="flex flex-col pb-10px lg:pl-20px">
        <br />
        <div className="p-5px text-center">
          <div className="mb-4 flex flex-col">
            <input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-[300px] border p-2"
              placeholder="Entrez votre nom et prénom"
            />
          </div>
          <form>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>Film</th>
                  <th style={{ width: "50%" }}>Notes</th>
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
        <br />

        <div className="flex items-center justify-center">
          <span>
            <div className="flex space-x-4">
              {" "}
              {/* or use space-x-8 for more spacing */}
              <button
                onClick={() =>
                  sendScreeningsToDatabase(
                    rowsData,
                    comments,
                    setResponseMessage,
                    fullName,
                  )
                }
                className="border bg-retro-green p-15px text-16px font-bold"
              >
                ENVOYEZ VOTRE TOP&nbsp;!
              </button>
              <button
                onClick={handleShare}
                className="border bg-retro-green p-15px text-16px font-bold"
              >
                Prenez un screenshot de votre top
              </button>
            </div>
            <p>
              <b>{responseMessage}</b>
            </p>
          </span>
        </div>
      </div>
      <ShareableContent rowsData={rowsData} fullName={fullName} />
    </>
  );
}

async function sendScreeningsToDatabase(
  rowsData: {
    movie: string;
    movie_id: string;
    note: string;
  }[],
  comments: string,
  setResponseMessage: (message: string) => void,
  fullName: string,
) {
  try {
    const API_ENDPOINT =
      "https://europe-west1-website-cine.cloudfunctions.net/trigger_upload_poll_data_to_db";

    // Transform the rowsData to the new format
    const transformedData = rowsData.map((row) => {
      // Check if any required field is missing or NaN
      if (!(row.movie == "")) {
        return {
          movie: row.movie,
          id: row.movie_id,
          notes: row.note,
        };
      }
    });

    const payload = {
      collection_name: "sondage-2024",
      votes: transformedData,
      comments: comments,
      full_name: fullName,
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
  onUpdate: (data: { movie: string; movie_id: string; note: string }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieId, setMovieId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [note, setNote] = useState("");

  const setSearchFind = (st: string, id: string = "") => {
    setSearchTerm(st);
    setMovieId(id);
    setShowResults(true);
    onUpdate({ movie: st, movie_id: id, note });
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
              note: e.target.value,
            });
          }}
        />
      </td>
    </tr>
  );
}
