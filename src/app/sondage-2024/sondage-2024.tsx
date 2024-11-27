"use client";

import html2canvas from "html2canvas";
import Image from "next/image";
import React, { ReactNode, useState } from "react";

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
    <div className="relative max-w-2xl rounded-lg bg-retro-green p-8 shadow-lg">
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
      <div className="mt-8 flex items-end justify-between">
        <Image
          src="/img/logo-gray.png"
          alt="Logo"
          width={48}
          height={48}
          className="h-12 w-auto"
        />
        <span className="font-bold text-retro-gray">#MaRetro2024</span>
      </div>
    </div>
  );
}

function SharePage({ rowsData, fullName }: ShareableContentProps) {
  const handleDownload = async () => {
    try {
      const element = document.getElementById("shareableContent");
      if (!element) return;

      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: true,
      });

      // Open image in new tab instead of direct download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
          // Clean up the URL after the window is opened
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (error) {
      console.error("Error creating image:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-retro-gray p-4">
      <div id="shareableContent">
        <ShareableContent rowsData={rowsData} fullName={fullName} />
      </div>

      <h2 className="mb-4 mt-12 text-2xl font-bold tracking-wide text-retro-green">
        PARTAGEZ VOTRE TOP !
      </h2>

      <div className="flex space-x-4">
        <button
          onClick={() => (window.location.href = "/sondage-2024")}
          className="border bg-retro-green p-4 text-lg font-bold shadow-lg hover:bg-opacity-90"
        >
          Modifier votre top
        </button>
        <button
          onClick={handleDownload}
          className="border bg-retro-green p-4 text-lg font-bold shadow-lg hover:bg-opacity-90"
        >
          Télécharger
        </button>
      </div>
    </div>
  );
}

function SondageRow({
  cell1,
  cell2,
  cell3,
}: {
  cell1: ReactNode;
  cell2: ReactNode;
  cell3: ReactNode;
}) {
  return (
    <div className="flex text-left">
      <div className="w-[8%] px-4 py-5px">{cell1}</div>
      <div className="w-[52%] px-4 py-5px">{cell2}</div>
      <div className="w-[40%] px-4 py-5px">{cell3}</div>
    </div>
  );
}

function MovieRow({
  index,
  allMoviesPromise,
  onUpdate,
}: {
  index: number;
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
    <SondageRow
      cell1={
        <div className="font-bold">
          {index + 1}
          {index < 5 && <span className="text-red-500">*</span>}
        </div>
      }
      cell2={
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
      }
      cell3={
        <input
          type="text"
          className="h-42px w-full px-2 lg:h-48px"
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
      }
    />
  );
}

function FreeformQuestion({
  question,
  value,
  onChangeFunction,
}: {
  question: string;
  value: string;
  onChangeFunction: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col items-center p-4">
      <label className="mb-2 text-center text-15px">{question}</label>
      <textarea
        value={value}
        onChange={(e) => onChangeFunction(e.target.value)}
        className="h-[100px] w-[min(95%,400px)] resize-none rounded p-2"
      />
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
  const [fullName, setFullName] = useState("");
  const [showSharePage, setShowSharePage] = useState(false);

  // Additional state variables
  const [othermovies, setothermovies] = useState("");
  const [real, setreal] = useState("");
  const [nombredefois, setnombredefois] = useState("");
  const [autreinformation, setautreinformation] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);

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
        other_movies: othermovies,
        director_requests: real,
        cinema_visits: nombredefois,
        additional_feedback: autreinformation,
        full_name: fullName,
        email: email,
        newsletter_signup: newsletter,
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
          Votez pour vos meilleures ressorties cinéma de 2024
        </SousTitre1>
      </PageHeader>
      <div className="flex flex-col pb-10px lg:pl-20px">
        <div className="p-5px text-center">
          <div className="mb-4 flex flex-col items-center">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-[300px] border p-2"
              placeholder="Nom (facultatif)"
            />
          </div>
          {/* Top */}
          <SondageRow
            cell1={<div className="font-bold">#</div>}
            cell2={<div className="font-bold">Film</div>}
            cell3={<div className="font-bold">Notes</div>}
          />
          {rowsData.map((_, index) => (
            <MovieRow
              key={index}
              index={index}
              allMoviesPromise={allMoviesPromise}
              onUpdate={(data) => updateRowData(index, data)}
            />
          ))}
          {/* Add note about mandatory fields */}
          <div className="mt-2 text-left text-sm">
            <span className="text-red-500">*</span> Les 5 premiers films sont
            obligatoires
          </div>
          {/* Additional Questions */}
          <div className="space-y-10px pt-25px">
            <FreeformQuestion
              question="Quels autres films avez-vous particulièrement apprécié découvrir cette année ? (facultatif)"
              value={othermovies}
              onChangeFunction={setothermovies}
            />
            <FreeformQuestion
              question="Y a-t-il des films/réalisateurs·rices en particulier que vous aimeriez voir plus souvent programmés en salle ?"
              value={real}
              onChangeFunction={setreal}
            />
            <FreeformQuestion
              question="À combien estimez-vous le nombre de fois où vous êtes allé·e·s voir un film en ressortie au cinéma cette année ?"
              value={nombredefois}
              onChangeFunction={setnombredefois}
            />
            <FreeformQuestion
              question="Des retours supplémentaires sur notre projet ou sur notre site web ?"
              value={autreinformation}
              onChangeFunction={setautreinformation}
            />
            {/* Newsletter Signup */}
            <div className="flex flex-col items-center space-y-4 p-4">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="mt-1"
                />
                <label className="text-left text-15px">
                  Je souhaite m&apos;inscrire être inscrit•e à la newsletter du
                  Rétro Projecteur pour recevoir toute l&apos;actualité des
                  ressorties cinéma chaque semaine !
                </label>
              </div>
              {newsletter && (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="w-[300px] rounded border p-2"
                />
              )}
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              className="border bg-retro-green p-4 text-lg font-bold"
            >
              ENVOYEZ !
            </button>
          </div>
          <p className="mt-4 font-bold">{responseMessage}</p>
        </div>
      </div>
    </>
  );
}
