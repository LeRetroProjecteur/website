"use client";

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
    <div className="max-w-2xl rounded-lg bg-retro-green p-8 shadow-lg">
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
  );
}

// New SharePage component
export function SharePage({ rowsData, fullName }: ShareableContentProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mon Top Films 2024",
          text: `Découvrez le top films 2024 de ${fullName}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Partage non supporté sur votre navigateur");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-retro-gray p-4">
      <ShareableContent rowsData={rowsData} fullName={fullName} />
      <button
        onClick={handleShare}
        className="mt-8 border bg-retro-green p-4 text-lg font-bold shadow-lg hover:bg-opacity-90"
      >
        Partagez sur les réseaux
      </button>
    </div>
  );
}

export default function Sondage2024({
  allMoviesPromise,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
}) {
  const numSubmissions = 10;
  const [responseMessage, setResponseMessage] = useState("");
  const [rowsData, setRowsData] = useState(
    Array(numSubmissions).fill({
      movie: "",
      movie_id: "",
      note: "",
    }),
  );
  const [comments] = useState("");
  const [fullName, setFullName] = useState("");
  const [showSharePage, setShowSharePage] = useState(false);

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

  const handleSubmit = async () => {
    try {
      const API_ENDPOINT =
        "https://europe-west1-website-cine.cloudfunctions.net/trigger_upload_poll_data_to_db";

      const transformedData = rowsData
        .filter((row) => row.movie !== "")
        .map((row) => ({
          movie: row.movie,
          id: row.movie_id,
          notes: row.note,
        }));

      const payload = {
        collection_name: "sondage-2024",
        votes: transformedData,
        comments,
        full_name: fullName,
      };

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setResponseMessage("Données envoyées avec succès!");
      setShowSharePage(true);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  };

  if (showSharePage) {
    return <SharePage rowsData={rowsData} fullName={fullName} />;
  }

  return (
    <>
      <PageHeader text="Sondage Top 2024">
        <SousTitre1>
          Votez pour vos meilleures découvertes de cinéma de patrimoine de 2024
        </SousTitre1>
      </PageHeader>
      <div className="flex flex-col pb-10px lg:pl-20px">
        <div className="p-5px text-center">
          <div className="mb-4 flex flex-col">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-[300px] border p-2"
              placeholder="Entrez votre nom et prénom"
            />
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-1/2">Film</th>
                <th className="w-1/2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rowsData.map((_, index) => (
                <ScreeningRow
                  key={index}
                  allMoviesPromise={allMoviesPromise}
                  onUpdate={(data) => updateRowData(index, data)}
                />
              ))}
            </tbody>
          </table>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              className="border bg-retro-green p-4 text-lg font-bold"
            >
              ENVOYEZ VOTRE TOP !
            </button>
          </div>
          <p className="mt-4 font-bold">{responseMessage}</p>
        </div>
      </div>
    </>
  );
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
    <tr className="bg-white">
      <td className="py-5px">
        <div className="flex grow flex-col">
          <RetroInput
            value={searchTerm}
            setValue={(st) => setSearchFind(st)}
            leftAlignPlaceholder
            customTypography
            placeholder="Recherchez un film..."
            transparentPlaceholder
            className="flex grow"
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
                    `${movie.title}, ${movie.directors} (${movie.year})`,
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
