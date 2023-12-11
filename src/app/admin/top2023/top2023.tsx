"use client";

import {useSearchParams} from "next/navigation";
import React, {Fragment, useEffect, useRef, useState} from "react";
import Top2023Search from "@/app/admin/top2023/top2023-search";

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

  const [userName, setUserName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
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
      <h2>
        Votre Top5 2023 :
      </h2>
      <div style={{ textAlign: "center" }}>
          <form>
          {tops.map((k, i) => (
            <Fragment key={k}>
              <h3>{"Number " + (i+1)}</h3>
              <Top2023Search
                  onSearchTermChange={(term) => handleSearchTermChange(i, term)}
              />
            </Fragment>
          ))}
          <br />
          <br />
        </form>
      </div>
        <br />
        <input
            type="text"
            id="userNameInput"
            placeholder="Enter your name"
            value={userName}
            onChange={handleInputChange}
            style={{ fontSize: "20px"}}
        />
        <span>
            <button onClick={() => sendNameToFirestore(userName, topsValues, setResponseMessage)} style={{ fontSize: "20px"}}>
                Send us your top
            </button>
        </span>
        <p>{responseMessage}</p>
    </>
  );
}

async function sendNameToFirestore(userName: string, topsValues: string[], setResponseMessage: (message: string) => void) {
    const response = await fetch('https://europe-west1-website-cine.cloudfunctions.net/add_name_to_firestore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"name": userName, "tops": topsValues}),
    });
    if (response.ok) {
        setResponseMessage("Your top has been saved. Thank you!");
    } else {
        // Handle non-successful response
        console.error('Error sending name to Firestore:', response.statusText);
        setResponseMessage("Failed to save your top. Please try again.");
    }
}