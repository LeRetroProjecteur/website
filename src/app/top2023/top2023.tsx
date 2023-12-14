"use client";

import {useSearchParams} from "next/navigation";
import React, {Fragment, useEffect, useRef, useState} from "react";
import Top2023Search from "@/app/top2023/top2023-search";
import Head from "next/head";

interface Inputs {
  mercredi: string;
  jeudi: string;
  vendredi: string;
  samedi: string;
  dimanche: string;
  lundi: string;
  mardi: string;
}

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


  const [autreinformation, setautreinformation] = useState('');
  const handleautreinformationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setautreinformation(event.target.value);
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
        <div>
          <Head>
              <link rel="icon" type="image/png" href="/img/icon.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:image" content="/img/icon.png" />
          </Head>
        </div>
        <h1>
            Sondage
        </h1>
      <h2>
        Votez pour vos meilleures découvertes de cinéma de patrimoine de 2023&nbsp;!
      </h2>
        <br />

        <h4>
            Est éligible tout film vieux de plus de trois ans.
        </h4>
        <p>
            <b>NB :</b> Si vous ne trouvez pas votre choix dans les propositions automatiques, entrez simplement le nom du film et du réalisateur et passez à la case suivante.
        </p>
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
        </span>
        <span>
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
                      <label htmlFor="othermovies" style={{ fontSize: "15px", marginBottom: '10px' }}> Quels autres films avez-vous particulièrement apprécié découvrir cette année ? (facultatif)</label>
                      <textarea
                        id="othermovies"
                        value={othermovies}
                        rows={5}
                        style={{fontSize: "15px", wordWrap: 'break-word', width: 'min(95%, 400px)', height: '100px', padding: '5px', marginLeft: '10px', marginRight: '10px'}}
                        onChange={handleothermoviesChange}
                      />
                  </div>

                      <div style={{ display: 'flex', flexDirection: 'column', padding: "10px", alignItems: 'center' }}>
                      <label htmlFor="nombredefois" style={{ fontSize: "15px", marginBottom: '10px' }}> A combien estimez-vous le nombre de fois où vous êtes allés voir un film de patrimoine au cinéma cette année ? (facultatif)</label>
                      <textarea
                        id="nombredefois"
                        value={nombredefois}
                        rows={5}
                        style={{fontSize: "15px", wordWrap: 'break-word', width: 'min(95%, 400px)', height: '100px', padding: '5px', marginLeft: '10px', marginRight: '10px' }}
                        onChange={handlenombredefoisChange}
                      />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', padding: "10px", alignItems: 'center' }}>
                      <label htmlFor="real" style={{ fontSize: "15px", marginBottom: '10px' }}>Y a-t-il des films/réalisateurs en particulier que vous aimeriez voir plus souvent programmés en salle ? (facultatif)</label>
                      <textarea
                        id="real"
                        value={real}
                        rows={5}
                        style={{fontSize: "15px", wordWrap: 'break-word', width: 'min(95%, 400px)', height: '100px', padding: '5px', marginLeft: '10px', marginRight: '10px' }}
                        onChange={handlerealChange}
                      />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', padding: "10px", alignItems: 'center' }}>
                      <label htmlFor="autreinformation" style={{ fontSize: "15px", marginBottom: '10px' }}>Faites-nous part de vos retours sur notre projet ou sur notre site web ! (facultatif)</label>
                      <textarea
                        id="autreinformation"
                        value={autreinformation}
                        rows={5}
                        style={{fontSize: "15px", wordWrap: 'break-word', width: 'min(95%, 400px)', height: '100px', padding: '5px', marginLeft: '10px', marginRight: '10px' }}
                        onChange={handleautreinformationChange}
                      />
                  </div>
        </form>
      </div>
        <div style={{ display: 'flex', padding:"15px", justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <span>
            <button onClick={() =>
                sendNameToFirestore(
                    userName,
                    mail,
                    topsValues,
                    othermovies,
                    autreinformation,
                    nombredefois,
                    real,
                    setResponseMessage
                )
            } style={{ fontSize: "15px", padding:"5px", backgroundColor: 'rgba(255, 77, 77, 0.5)' }}>
                Envoyez votre top !
            </button>
            <p><b>{responseMessage}</b></p>
        </span>
        </div>
    </>
  );
}

async function sendNameToFirestore(
    userName: string,
    mail: string,
    topsValues: string[],
    othermovies: string,
    autreinformation: string,
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
                "autreinformation": autreinformation}
        ),
    });
    if (response.ok) {
        setResponseMessage("Bien reçu, merci !");
    } else {
        setResponseMessage("Il y a eu une erreur, pouvez-vous vous ré-essayer ?");
    }
}