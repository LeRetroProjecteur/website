// MovieAlertButton.tsx (New file)
'use client'

import React, { useState, useEffect } from 'react';
import {TextBox} from "@/components/layout/text-boxes";

export default function MovieAlertButton({ movieId, movieTitle }: { movieId: string, movieTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  const handleAlertClick = () => {
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const API_ENDPOINT = "https://europe-west1-website-cine.cloudfunctions.net/trigger_email_alert_to_db";

      const payload = {
        movie_id: movieId,
        movie_title: movieTitle,
        user_email: email,
        timestamp: new Date().toISOString(),
      };

      console.log("Sending payload:", payload);  // Console log

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

      console.log("Alert registered successfully");  // Console log
      closeAlert();
    } catch (error) {
      console.error("Fetch error:", error);  // Console log
    }
  };

  return (
    <>
      <div className="mt-4">
        <TextBox textColor="retro-gray" bgColor="retro-blue" onClick={handleAlertClick}>
          <div>Se tenir informé des prochaines séances</div>
        </TextBox>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-retro-blue p-6 rounded-lg shadow-lg w-96">
            <div className="relative flex items-center justify-center border-b border-retro-gray mb-4">
              <div className="py-2 text-center text-2xl font-medium uppercase text-retro-gray">
                « Up Close »
              </div>
              <button
                className="absolute right-0 cursor-pointer"
                onClick={closeAlert}
              >
                <svg
                  className="h-6 w-6 fill-retro-gray stroke-retro-blue"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="22" height="22" />
                  <line x1="4.79289" y1="16.8929" x2="16.793" y2="4.89282" strokeWidth="2" />
                  <line x1="16.7931" y1="17.1072" x2="4.79306" y2="5.10712" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <div className="text-center text-4xl font-black uppercase leading-tight tracking-wide text-retro-gray mb-4">
              S'INSCRIRE<br />À L'ALERTE<br />DU FILM
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  value={movieTitle}
                  readOnly
                  className="w-full p-2 border border-retro-gray bg-retro-blue text-retro-gray"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="adresse@mail.com"
                  className="w-full p-2 border border-retro-gray bg-retro-blue text-retro-gray"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-retro-gray text-retro-blue font-medium uppercase hover:bg-blue-600 hover:text-white transition-colors"
              >
                Confirmer l'alerte
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}