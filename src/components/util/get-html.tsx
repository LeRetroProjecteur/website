"use client";

import { MutableRefObject, ReactNode, useEffect, useRef } from "react";

export default function GetHTML({
  children,
  onChange,
}: {
  children: ReactNode;
  onChange: (html: string) => void;
}) {
  const div: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    if (div.current != null) {
      onChange(div.current?.innerHTML);
    }
  });

  return (
    <div className="hidden" ref={div}>
      {children}
    </div>
  );
}
