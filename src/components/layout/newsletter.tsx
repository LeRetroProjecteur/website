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
        <div className="fixed bottom-[11vh] right-[5vw] z-50 flex">
          <div className="flex flex-col gap-20px">
            <div className="bg-retro-blue px-20px pb-20px">
              <div className="border-b text-center text-22px font-medium uppercase leading-54px text-retro-gray">
                up close
              </div>
              <div className="border-b py-18px text-center font-degular text-71px font-extrabold uppercase leading-58px tracking-[0.01em] text-retro-gray">
                S&apos;INSCRIRE
                <br />À LA
                <br />
                NEWSLETTER
              </div>
              <div className="flex justify-center pb-10px pt-20px">
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
                  className="grow cursor-pointer border bg-retro-gray py-10px text-center text-20px font-medium uppercase leading-25px text-retro-blue hover:bg-retro-blue hover:text-retro-gray"
                  onClick={subscribe}
                />
              </div>
            </div>
            <div
              className="cursor-pointer self-end bg-retro-blue"
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
                  strokeWidth="2"
                />
                <line
                  x1="28.725"
                  y1="28.289"
                  x2="8.54308"
                  y2="8.10707"
                  className="stroke-retro-gray"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </form>
    )
  );
}
