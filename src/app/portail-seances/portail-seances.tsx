"use client";

import React, { ReactNode, useState } from "react";

import LoadingPage from "@/app/loading";
import { SearchResults } from "@/app/recherche/recherche";
import { MiddleColumn } from "@/components/articles/articles";
import RetroInput from "@/components/forms/retro-input";
import { SuspenseWithLoading } from "@/components/icons/loading";
import { ThreeColumnPage } from "@/components/layout/page";
import { TextBox } from "@/components/layout/text-boxes";
import { BodyCopy, BodyParagraphs } from "@/components/typography/typography";
import { SearchMovie, SearchTheater } from "@/lib/types";
import { formatLundi1Janvier, safeDate } from "@/lib/utils";

function TheaterSearch({
  onUpdate,
}: {
  onUpdate: (data: { name: string; theater_id: string }) => void;
}) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const setSearchFind = (theater: { name: string; theater_id: string }) => {
    setQuery(theater.name);
    setShowResults(true);
    onUpdate(theater);
  };

  return (
    <div className="flex grow flex-col">
      <RetroInput
        value={query}
        setValue={(st) => setSearchFind({ name: st, theater_id: "" })}
        leftAlignPlaceholder
        customTypography
        placeholder="Rechercher un cinéma..."
        transparentPlaceholder
        className="flex grow"
      />
      <SuspenseWithLoading hideLoading={query.length === 0}>
        {showResults && (
          <SearchResults
            mode="theater"
            className="border-x border-b px-5px py-2px text-left"
            nbResults={5}
            query={query}
            onClick={(theater) => {
              setSearchFind({
                name: (theater as SearchTheater).name,
                theater_id: (theater as SearchTheater).theater_id,
              });
              setShowResults(false);
            }}
          />
        )}
      </SuspenseWithLoading>
    </div>
  );
}

function Row({
  cell1,
  cell2,
  cell3,
}: {
  cell1: ReactNode;
  cell2: ReactNode;
  cell3: ReactNode;
}) {
  return (
    <div className="flex flex-nowrap gap-x-5px">
      <div className="flex grow basis-0">{cell1}</div>
      <div>{cell2}</div>
      <div>{cell3}</div>
    </div>
  );
}

function ScreeningRow({
  onUpdate,
}: {
  onUpdate: (data: {
    movie: string;
    movie_id: string;
    date: string;
    time: string;
    notes: string;
  }) => void;
}) {
  const [query, setQuery] = useState("");
  const [movieId, setMovieId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const setSearchFind = (st: string, id: string = "") => {
    setQuery(st);
    setMovieId(id);
    setShowResults(true);
    onUpdate({ movie: st, movie_id: id, date, time, notes });
  };

  return (
    <div className="flex flex-col gap-y-5px">
      <Row
        cell1={
          <div className="flex grow flex-col">
            <RetroInput
              value={query}
              setValue={(st) => setSearchFind(st)}
              leftAlignPlaceholder
              customTypography
              placeholder="Rechercher un film..."
              transparentPlaceholder
              className="hidden lg:block"
            />
            <RetroInput
              value={query}
              setValue={(st) => setSearchFind(st)}
              leftAlignPlaceholder
              customTypography
              placeholder="Rechercher..."
              transparentPlaceholder
              className="w-full lg:hidden"
            />
            {showResults && (
              <SearchResults
                className="border-x px-5px py-2px"
                nbResults={5}
                query={query}
                noResultsText="Nous ne trouvons pas votre film, mais vous pouvez le renseigner manuellement."
                noResultsTextSize="small"
                lowercase
                onClick={(m) => {
                  setSearchFind(
                    (m as SearchMovie).title +
                      ", " +
                      (m as SearchMovie).directors +
                      " (" +
                      (m as SearchMovie).year +
                      ")",
                    (m as SearchMovie).id,
                  );
                  setShowResults(false);
                }}
              />
            )}
          </div>
        }
        cell2={
          <input
            id="date"
            type="date"
            className="flex grow border [&::-webkit-calendar-picker-indicator]:ml-[-20px]"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              onUpdate({
                movie: query,
                movie_id: movieId,
                date: e.target.value,
                time,
                notes,
              });
            }}
          />
        }
        cell3={
          <input
            id="time"
            type="time"
            className="flex grow border [&::-webkit-calendar-picker-indicator]:ml-0"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              onUpdate({
                movie: query,
                movie_id: movieId,
                date,
                time: e.target.value,
                notes,
              });
            }}
          />
        }
      />
      <input
        id="notes"
        type="text"
        className="flex grow flex-col border"
        value={notes}
        placeholder="Note concernant la séance (facultatif)"
        onChange={(e) => {
          setNotes(e.target.value);
          onUpdate({
            movie: query,
            movie_id: movieId,
            date,
            time,
            notes: e.target.value,
          });
        }}
      />
    </div>
  );
}

function SharePage() {
  return (
    <MiddleColumn>
      <BodyCopy>Merci d&apos;avoir rajouté vos séances&nbsp;!</BodyCopy>
      <div className="flex flex-col gap-y-10px pt-30px">
        <TextBox
          onClick={() => window.location.reload()}
          className="text-retro-gray"
        >
          Rajouter des nouvelles séances
        </TextBox>
        <TextBox link={{ url: "/" }} className="text-retro-gray">
          Retour sur le site principal
        </TextBox>
      </div>
    </MiddleColumn>
  );
}

export default function SubmitScreenings() {
  const numSubmissions = 5;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSharePage, setShowSharePage] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [rowsData, setRowsData] = useState(
    Array(numSubmissions).fill({
      movie: "",
      movie_id: "",
      date: "",
      time: "",
      notes: "",
    }),
  );
  const [theaterData, setTheaterData] = useState({ name: "", theater_id: "" });
  const [organization, setOrganization] = useState("");

  const updateRowData = (
    index: number,
    data: {
      movie: string;
      movie_id: string;
      date: string;
      time: string;
      notes: string;
    },
  ) => {
    const newRowsData = [...rowsData];
    newRowsData[index] = data;
    setRowsData(newRowsData);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Format showtimes for Slack
      const showtimesText = rowsData
        .filter((row) => row.movie && row.date)
        .map((row) =>
          JSON.stringify({
            theater_id: theaterData.theater_id,
            movie_id: row.movie_id,
            date: row.date,
            time: row.time,
            notes: row.notes || "",
          }),
        )
        .join("|||");

      const warningMessage = `*Cinéma:* ${theaterData.name}${
        organization ? ` (${organization})` : ""
      }\n\n*Séances: *\n${rowsData
        .filter((row) => row.movie && row.date)
        .map(
          (row) =>
            `<https://leretroprojecteur.com/film/${row.movie_id}|${
              row.movie
            }> - ${formatLundi1Janvier(safeDate(row.date))} ${row.time}${
              row.notes ? `\n_${row.notes}_` : ""
            }`,
        )
        .join("\n\n")}\n\nDATA:${showtimesText}`;
      const slackEndpoint =
        "https://europe-west1-website-cine.cloudfunctions.net/trigger_send_interactive_warning";
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
    }
    setIsSubmitting(false);
  };
  return (
    <>
      {isSubmitting ? (
        <LoadingPage />
      ) : (
        <ThreeColumnPage>
          {showSharePage ? (
            <SharePage />
          ) : (
            <>
              <MiddleColumn>
                <BodyCopy>
                  <BodyParagraphs>
                    <p>
                      Bienvenue sur notre portail de rajout de séances&nbsp;!
                    </p>
                    <p>
                      Si vous gérez un cinéma, un ciné-club ou participez à la
                      programmation de films en salles, vous pouvez utiliser
                      cette page pour rajouter des séances à notre calendrier.
                    </p>
                    <p>
                      Nous n&apos;indiquons sur notre site web que les séances
                      de films qui ont été produits il y a plus de trois ans.
                      Veuillez s&apos;il vous plaît ne pas rajouter de séances
                      de films plus récents.
                    </p>
                    <p>
                      Si vous ne trouvez pas le film recherché dans nos
                      propositions, merci d&apos;entrer les informations
                      manuellement &ndash; en reprenant le format «&nbsp;Nom du
                      film, Cinéaste (Année)&nbsp;» &ndash; et de passer à la
                      case suivante. S&apos;il s&apos;agit d&apos;une séance
                      spéciale, merci de renseigner les informations relatives à
                      la séance (e.g., «&nbsp;En présence de la
                      réalisatrice.&nbsp;») dans le champ «&nbsp;Note&nbsp;» en
                      dessous. Si vous avez des questions, n&apos;hésitez pas à{" "}
                      <a
                        className="underline"
                        href="mailto:contact@leretroprojecteur.com"
                      >
                        nous contacter
                      </a>
                      .
                    </p>
                  </BodyParagraphs>
                </BodyCopy>
                <div className="pb-25px pt-25px">
                  <BodyCopy className="pb-5px">
                    Dans quelle salle se déroulent les séances que vous souhaitez
                    renseigner&nbsp;?
                  </BodyCopy>
                  <TheaterSearch onUpdate={setTheaterData} />
                </div>
                <div className="pb-25px">
                  <BodyCopy className="pb-5px">
                    Quelle organisation/ciné-club représentez-vous&nbsp;?
                  </BodyCopy>
                  <input
                    type="text"
                    className="flex w-full grow border p-10px"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Nom de votre organisation"
                  />
                </div>
                <div className="flex flex-col gap-y-15px">
                  <div className="border-y py-6px text-17px uppercase text-retro-gray">
                    <Row
                      cell1={<div>Film</div>}
                      cell2={<div>Date</div>}
                      cell3={<div>Horaire</div>}
                    />
                  </div>
                  {rowsData.map((_, index) => (
                    <ScreeningRow
                      key={index}
                      onUpdate={(data) => updateRowData(index, data)}
                    />
                  ))}
                </div>
                <br />
                <TextBox
                  onClick={handleSubmit}
                  className="bg-retro-green text-retro-gray"
                >
                  Rajoutez vos séances
                </TextBox>
                <BodyCopy className="pt-10px">{responseMessage}</BodyCopy>
              </MiddleColumn>
            </>
          )}
        </ThreeColumnPage>
      )}
    </>
  );
}
