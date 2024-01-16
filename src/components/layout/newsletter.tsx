"use client";

import { useCallback, useState } from "react";

import { closeNewsLetter, useNewsletterStore } from "@/lib/newsletter-store";

import RetroInput from "../forms/retro-input";

export default function Newsletter() {
  const isOpen = useNewsletterStore((s) => s.isOpen);
  const [email, setEmail] = useState("");
  const subscribe = useCallback(() => {}, []);

  return (
    isOpen && (
      <form
        action="https://leretroprojecteur.us6.list-manage.com/subscribe/post?u=00a9245e71d3375ef4542a588&amp;id=3270cdb251&amp;f_id=00e804e3f0"
        method="post"
        target="_blank"
      >
        <div className="fixed z-50 flex h-screen w-screen items-center justify-center">
          <div className="flex flex-col lg:gap-20px">
            <div className="bg-retro-blue lg:px-20px lg:pb-20px">
              <div className="lg:text-22px lg:leading-54px border-b text-center font-medium uppercase text-retro-gray">
                up close
              </div>
              <div className="lg:text-71px lg:leading-58px border-b text-center font-degular font-extrabold uppercase tracking-[0.01em] lg:py-18px">
                S&apos;INSCRIRE
                <br />À LA
                <br />
                NEWSLETTER
              </div>
              <div className="flex justify-center lg:pb-10px lg:pt-20px">
                <RetroInput
                  blue
                  value={email}
                  setValue={setEmail}
                  name="EMAIL"
                  placeholder="adresse@mail.com"
                ></RetroInput>
              </div>
              <div className="flex">
                <input
                  type="submit"
                  value="s'inscrire"
                  className="text-retro-blue grow cursor-pointer bg-retro-gray text-center font-medium uppercase lg:py-10px lg:text-20px lg:leading-25px"
                  onClick={subscribe}
                />
              </div>
            </div>
            <div
              className="bg-retro-blue cursor-pointer self-end"
              onClick={closeNewsLetter}
            >
              <svg
                viewBox="0 0 37 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-37px w-37px"
              >
                <rect className="h-37px w-37px fill-retro-blue" />
                <line
                  x1="8.54289"
                  y1="28.8929"
                  x2="28.7248"
                  y2="8.71092"
                  className="stroke-retro-gray"
                  stroke-width="2"
                />
                <line
                  x1="28.725"
                  y1="28.289"
                  x2="8.54308"
                  y2="8.10707"
                  className="stroke-retro-gray"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </form>
    )
  );
}
