"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  closeNewsLetter,
  openNewsLetter,
  useNewsletterStore,
} from "@/lib/newsletter-store";

import RetroInput from "../forms/retro-input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { TextBox } from "./text-boxes";

export default function Newsletter() {
  const isOpen = useNewsletterStore((s) => s.isOpen);
  const [email, setEmail] = useState("");
  const [how, setHow] = useState("");

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeNewsLetter();
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  return (
    <Dialog
      modal={false}
      open={isOpen}
      onOpenChange={(open) => (open ? openNewsLetter() : closeNewsLetter())}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>« Up Close »</DialogTitle>
        </DialogHeader>
        <div className="border-b pb-20px text-center font-degular text-71px font-black uppercase leading-58px tracking-[0.01em] text-retro-gray">
          S&apos;inscire
          <br />à notre
          <br />
          newsletter
        </div>
        <form
          action="https://leretroprojecteur.us6.list-manage.com/subscribe/post?u=00a9245e71d3375ef4542a588&amp;id=3270cdb251&amp;f_id=00e804e3f0"
          method="post"
          target="_blank"
        >
          <div className="flex flex-col justify-center gap-10px">
            <RetroInput
              blue
              value={email}
              setValue={setEmail}
              name="EMAIL"
              placeholder="adresse@mail.com"
              grayText
            />
            <RetroInput
              blue
              value={how}
              setValue={setHow}
              name="MMERGE1"
              placeholder="Comment nous connaissez-vous ?"
            />
            <TextBox
              className="bg-retro-gray text-retro-blue hover:bg-retro-blue hover:text-retro-gray"
              onClick={closeNewsLetter}
            >
              S&apos;inscrire
            </TextBox>
          </div>
          <div className="pt-15px text-center text-20px font-medium uppercase leading-25px text-retro-gray underline">
            <Link href="/newsletter" onClick={closeNewsLetter}>
              En savoir plus
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
