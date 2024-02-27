"use client";

import clsx from "clsx";
import { MutableRefObject, useEffect, useRef } from "react";

export default function IFrame({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const ref: MutableRefObject<HTMLIFrameElement | null> = useRef(null);

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
    <iframe ref={ref} className={clsx(className, "flex grow border py-10px")} />
  );
}
