"use client";

import clsx from "clsx";
import { MutableRefObject, useEffect, useRef } from "react";
import { useInterval } from "usehooks-ts";

export default function IFrame({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const ref: MutableRefObject<HTMLIFrameElement | null> = useRef(null);

  useInterval(() => {
    if (ref.current?.contentWindow?.document?.children != null) {
      ref.current.height = `${
        ref.current.contentWindow.document.children[0].scrollHeight + 100
      }px`;
    }
  }, 500);

  useEffect(() => {
    if (ref.current?.contentWindow != null) {
      const doc = ref.current.contentWindow.document;
      doc.open();
      if (doc.children.length == 0) {
        doc.appendChild(doc.createElement("body"));
      }
      doc.children[0].innerHTML = html;
      doc.close();
    }
  }, [ref, html]);

  return (
    <iframe
      ref={ref}
      className={clsx(className, "border py-10px")}
      dangerouslySetInnerHTML={{ __html: "<!DOCTYPE html><body></body>" }}
    />
  );
}
