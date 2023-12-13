"use client";

import {useSearchParams} from "next/navigation";
import React, {Fragment, useEffect, useRef, useState} from "react";
import Top2023Search from "@/app/top2023/top2023-search";
import {Metadata} from "next";

interface Inputs {
  mercredi: string;
  jeudi: string;
  vendredi: string;
  samedi: string;
  dimanche: string;
  lundi: string;
  mardi: string;
}

export const metadata: Metadata = {
  title:
    "Sondage | Cinéma de patrimoine 2023",
};

export default function SemaineAuCinema() {
  useSearchParams();
  const [weekHtml, setWeekHtml] = useState("");
  const weekHtmlRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (weekHtml !== weekHtmlRef?.current?.innerHTML ?? "") {
      setWeekHtml(weekHtmlRef?.current?.innerHTML ?? "");
    }
  });

  const ints: number[] = Array.from(Array(5).keys());
  const top_ints_string: string[] = ints.map((i) => i.toString());
  const tops: Array<keyof Inputs> = top_ints_string.map(
    (int) => int as keyof Inputs,
  );

  const [responseMessage, setResponseMessage] = useState('');
  const [userName, setUserName] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const [mail, setmail] = useState('');
  const handlemailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setmail(event.target.value);
  };


  const [autreInformation, setAutreInformation] = useState('');
  const handleAutreInformationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAutreInformation(event.target.value);
  };

  const [othermovies, setothermovies] = useState('');
  const handleothermoviesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setothermovies(event.target.value);
  };

  const [nombredefois, setnombredefois] = useState('');
  const handlenombredefoisChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setnombredefois(event.target.value);
  };
  const [real, setreal] = useState('');
  const handlerealChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setreal(event.target.value);
  };


  const [topsValues, setTopsValues] = useState<string[]>(Array(tops.length).fill(''));
  const handleSearchTermChange = (index: number, term: string) => {
      console.log('handleSearchTermChange called with', index, term);
      setTopsValues((prevTopsValues) => {
      const newTopsValues = [...prevTopsValues];
      newTopsValues[index] = term;
      return newTopsValues;
    });
  };


  return (
    <>
        <h1>
            Sondage
        </h1>
      <h2>
        Votez pour vos meilleures découvertes de cinéma de patrimoine de 2023 !
      </h2>
        <br />

        <h4>
            Est élligible tout film vieux de plus de trois ans. Vous pouvez lister entre cinq et dix films.
            NB : Si vous ne trouvez pas votre choix dans les propositions automatiques, entrez simplement le nom du film et du réalisateur et passez à la prochaine case suivante.
        </h4>
        <br />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span>
            <input
                type="text"
                id="userNameInput"
                placeholder="Nom"
                value={userName}
                onChange={handleInputChange}
                style={{ fontSize: "15px", marginBottom:"10px"}}
            />
            <input
                type="text"
                id="mail"
                placeholder="Adresse mail (facultatif)"
                value={mail}
                onChange={handlemailChange}
                style={{ fontSize: "15px", marginBottom:"10px"}}
            />
        </span>
        </div>
        <br />
      <div style={{ textAlign: "center", padding:"5px" }}>
          <form>
          {tops.map((k, i) => (
            <Fragment key={k}>
              <h3>{"#" + (i+1)}</h3>
              <Top2023Search
                  onSearchTermChange={(term) => handleSearchTermChange(i, term)}
              />
            </Fragment>
          ))}
          <br />
          <br />
                  <div style={{ display: 'flex', flexDirection: 'column', padding: "10px", alignItems: 'center' }}>
                      <label htmlFor="othermovies" style={{ fontSize: "15px", marginBottom: '10px' }}> Y a-t-il des films supplémentaires dans votre Top ? (optionnel)</label>
                      <textarea
                        id="othermovies"
                        value={othermovies}
                        rows={5}
                        style={{fontSize: "20px", wordWrap: 'break-word', width: '400px', height: '100px', padding: '5px', marginLeft: '10px', marginRight: '10px'}}
                        onChange={handleothermoviesChange}
                      />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', padding: "10px", alignItems: 'center' }}>
                      <label htmlFor="nombredefois" style={{ fontSize: "15px", marginBottom: '10px' }}> A combien estimez-vous le nombre de fois où vous êtes allés voir un film de patrimoine au cinéma cette année ? (optionnel)</label>
                      <textarea
                        id="nombredefois"
                        value={nombredefois}
                        rows={5}
                        style={{fontSize: "20px", wordWrap: 'break-word', width: '400px', height: '100px', padding: '5px', marginLeft: '10px', marginRight: '10px' }}
                        onChange={handlenombredefoisChange}
                      />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', padding: "10px", alignItems: 'center' }}>
                      <label htmlFor="real" style={{ fontSize: "15px", marginBottom: '10px' }}>Y a-t-il des films/réalisateurs en particulier que vous aimeriez voir plus souvent programmés en salle ? (optionnel)</label>
                      <textarea
                        id="real"
                        value={real}
                        rows={5}
                        style={{fontSize: "20px", wordWrap: 'break-word', width: '400px', height: '100px', padding: '5px', marginLeft: '10px', marginRight: '10px' }}
                        onChange={handlerealChange}
                      />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', padding: "10px", alignItems: 'center' }}>
                      <label htmlFor="autreInformation" style={{ fontSize: "15px", marginBottom: '10px' }}>Vous voulez nous dire quelque chose ? (optionnel)</label>
                      <textarea
                        id="autreInformation"
                        value={autreInformation}
                        rows={5}
                        style={{fontSize: "15px", wordWrap: 'break-word', width: '400px', height: '100px', padding: '5px', marginLeft: '10px', marginRight: '10px' }}
                        onChange={handleAutreInformationChange}
                      />
                  </div>
        </form>
      </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <span>
            <button onClick={() =>
                sendNameToFirestore(
                    userName,
                    mail,
                    topsValues,
                    othermovies,
                    autreInformation,
                    nombredefois,
                    real,
                    setResponseMessage
                )
            } style={{ fontSize: "20px", padding:"10px", backgroundColor: 'rgba(255, 77, 77, 0.5)' }}>
                Envoyez votre top !
            </button>
        </span>
        </div>
        <p>{responseMessage}</p>
    </>
  );
}

async function sendNameToFirestore(
    userName: string,
    mail: string,
    topsValues: string[],
    othermovies: string,
    autreInformation: string,
    nombredefois: string,
    real: string,
    setResponseMessage: (message: string) => void)
{
    const response = await fetch('https://europe-west1-website-cine.cloudfunctions.net/add_name_to_firestore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "name": userName,
                "mail": mail,
                "tops": topsValues,
                "othermovies": othermovies,
                "nombredefois": nombredefois,
                "real": real,
                "autre": autreInformation}
        ),
    });
    if (response.ok) {
        setResponseMessage("Bien reçu, merci !");
    } else {
        setResponseMessage("Il y a eu une erreur, pouvez-vous vous ré-essayer ?");
    }
}