"use client";

import clsx from "clsx";
import React, { Fragment, ReactNode, useState } from "react";

import { SearchResults, TheaterSearchResults } from "@/app/recherche/recherche";
import { Breakout, MiddleColumn } from "@/components/articles/articles";
import RetroInput from "@/components/forms/retro-input";
import { SuspenseWithLoading } from "@/components/icons/loading";
import { ThreeColumnPage } from "@/components/layout/page";
import PageHeader from "@/components/layout/page-header";
import { TextBox } from "@/components/layout/text-boxes";
import {
  BodyCopy,
  SousTitre1,
  SousTitre2,
} from "@/components/typography/typography";
import { SearchMovie, SearchTheater } from "@/lib/types";

import LoadingPage from "../../loading";

function Row({
  cell1,
  cell2,
  cell3,
  cell4,
  className,
}: {
  cell1: ReactNode;
  cell2: ReactNode;
  cell3: ReactNode;
  cell4: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-wrap gap-x-10px", className)}>
      <div className="w-42px lg:w-250px">{cell1}</div>
      <div className="w-42px lg:w-150px">{cell2}</div>
      <div className="w-42px lg:w-150px">{cell3}</div>
      <div className="flex grow basis-0">{cell4}</div>
    </div>
  );
}

function ShareableContent() {
  return (
    <div className="max-w-700px rounded-lg border border-retro-gray bg-retro-green p-10px">
      <SousTitre1>Merci d&apos;avoir rajouté vos séances !</SousTitre1>
    </div>
  );
}

function SharePage() {
  return (
    <>
      <PageHeader text="Rajouter des séances">
        <SousTitre1>Votre salle</SousTitre1>
      </PageHeader>
      <div className="flex flex-col items-center justify-center py-10">
        <div className="flex grow pb-30px">
          <ShareableContent />
        </div>
        <div className="flex gap-x-10px">
          <TextBox onClick={() => window.location.reload()}>
            Rajouter des nouvelles séances
          </TextBox>
          <TextBox link="/">Retour sur le site du Rétro Projecteur</TextBox>
        </div>
      </div>
    </>
  );
}

export default function SubmitScreenings({
  allMoviesPromise,
  allTheatersPromise,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
  allTheatersPromise: Promise<SearchTheater[]>;
}) {
  const numSubmissions = 5;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSharePage, setShowSharePage] = useState(false);
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
      time: "",
      note: "",
    }),
  );
  const [comments, setComments] = useState("");
  const [theaterData, setTheaterData] = useState({ name: "", theater_id: "" });

  const updateRowData = (
    index: number,
    data: {
      movie: string;
      movie_id: string;
      date: string;
      time: string;
      note: string;
    },
  ) => {
    const newRowsData = [...rowsData];
    newRowsData[index] = data;
    setRowsData(newRowsData);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    await sendScreeningsToDatabase(
      theaterData,
      rowsData,
      comments,
      setResponseMessage,
      setIsSubmitting,
      setShowSharePage,
    );
  };

  if (showSharePage) {
    return <SharePage />;
  }

  return (
    <>
      <PageHeader text="Rajouter des séances">
        <SousTitre1>Votre salle</SousTitre1>
      </PageHeader>
      {isSubmitting ? (
        <LoadingPage />
      ) : (
        <ThreeColumnPage>
          <MiddleColumn>
            <strong>Cinema&nbsp;:</strong>
            <TheaterSearch
              allTheatersPromise={allTheatersPromise}
              onUpdate={setTheaterData}
            />
            <br />
          </MiddleColumn>
          <Breakout>
            <Row
              cell1={<SousTitre2>Film</SousTitre2>}
              cell2={<SousTitre2>Date</SousTitre2>}
              cell3={<SousTitre2>Horaire</SousTitre2>}
              cell4={<SousTitre2>Notes</SousTitre2>}
              className="border-y bg-retro-green py-6px font-bold uppercase text-retro-gray lg:px-20px lg:py-17px"
            />
            {rowsData.map((_, index) => (
              <ScreeningRow
                key={index}
                allMoviesPromise={allMoviesPromise}
                onUpdate={(data) => updateRowData(index, data)}
              />
            ))}
          </Breakout>
          <MiddleColumn>
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
            <br />
            <TextBox onClick={handleSubmit} className="bg-retro-pale-green">
              Rajoutez vos séances
            </TextBox>
            <BodyCopy className="pt-10px">{responseMessage}</BodyCopy>
          </MiddleColumn>
        </ThreeColumnPage>
      )}
    </>
  );
}

async function sendScreeningsToDatabase(
  theaterData: { name: string; theater_id: string },
  rowsData: {
    movie: string;
    movie_id: string;
    date: string;
    time: string;
    note: string;
  }[],
  comments: string,
  setResponseMessage: (message: string) => void,
  setIsSubmitting: (isSubmitting: boolean) => void,
  setShowSharePage: (showSharePage: boolean) => void,
) {
  setIsSubmitting(true);
  try {
    const API_ENDPOINT =
      "https://europe-west1-website-cine.cloudfunctions.net/trigger_upload_data_to_db";

    // Transform the rowsData to the new format
    const transformedData = rowsData.map((row) => {
      const [year, month, day] = row.date.split("-").map(Number);
      const [hour, minute] = row.time.split(":").map(Number);

      // Check if any required field is missing or NaN
      if (!(row.movie == "" || isNaN(year) || isNaN(month) || isNaN(day))) {
        return {
          movie: row.movie,
          id: row.movie_id,
          year: year,
          month: month,
          day: day,
          hour: hour,
          minute: minute,
          notes: row.note,
        };
      }
    });

    const payload = {
      collection_name: "raw-submit-screenings",
      theater_name: theaterData.name,
      theater_id: theaterData.theater_id,
      include_time_in_doc_name: false,
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

    // Format showtimes for Slack
    const showtimesText = rowsData
      .filter((row) => row.movie && row.date)
      .map((row) => `${row.movie} - ${row.date} ${row.time}`)
      .join("\n");
    const warningMessage = `*Nouvelles séances ajoutées*\n\n*Cinéma:* ${
      theaterData.name
    }\n\n*Séances:*\n${showtimesText}\n\n*Commentaires:* ${
      comments || "Aucun"
    }`;
    const slackEndpoint =
      "https://europe-west1-website-cine.cloudfunctions.net/trigger_send_warning";
    await fetch(
      `${slackEndpoint}?warning=${encodeURIComponent(
        warningMessage,
      )}&type=submit_screenings`,
      {
        method: "GET",
        mode: "cors",
      },
    );

    setResponseMessage("Données envoyées avec succès!");
    setShowSharePage(true);
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
    setIsSubmitting(false);
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
    time: string;
    note: string;
  }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieId, setMovieId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const setSearchFind = (st: string, id: string = "") => {
    setSearchTerm(st);
    setMovieId(id);
    setShowResults(true);
    onUpdate({ movie: st, movie_id: id, date, time, note });
  };

  return (
    <Row
      cell1={
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
                className="border-x px-5px py-2px"
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
      }
      cell2={
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
              time,
              note,
            });
          }}
        />
      }
      cell3={
        <input
          type="time"
          id="time"
          name="time"
          className="flex h-42px grow lg:h-48px"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
            onUpdate({
              movie: searchTerm,
              movie_id: movieId,
              date,
              time: e.target.value,
              note,
            });
          }}
        />
      }
      cell4={
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
              time,
              note: e.target.value,
            });
          }}
        />
      }
      className="py-10px"
    />
  );
}

function TheaterSearch({
  allTheatersPromise,
  onUpdate,
}: {
  allTheatersPromise: Promise<SearchTheater[]>;
  onUpdate: (data: { name: string; theater_id: string }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const setSearchFind = (theater: { name: string; theater_id: string }) => {
    setSearchTerm(theater.name);
    setShowResults(true);
    onUpdate(theater);
  };

  return (
    <div className="flex grow flex-col">
      <RetroInput
        value={searchTerm}
        setValue={(st) => setSearchFind({ name: st, theater_id: "" })}
        leftAlignPlaceholder
        customTypography
        placeholder="Recherchez un cinéma..."
        transparentPlaceholder
        className="flex grow"
      />
      <SuspenseWithLoading hideLoading={searchTerm.length === 0}>
        {showResults && (
          <TheaterSearchResults
            extraClass="text-left px-5px py-2px border-x border-b"
            nbResults={5}
            searchTerm={searchTerm}
            allDataPromise={allTheatersPromise}
            onClick={(theater) => {
              setSearchFind({
                name: theater.name,
                theater_id: theater.theater_id,
              });
              setShowResults(false);
            }}
          />
        )}
      </SuspenseWithLoading>
    </div>
  );
}
