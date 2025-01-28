"use client";

import { ReactNode, RefObject, useEffect, useRef } from "react";

export default function GetHTML({
  children,
  onChange,
}: {
  children: ReactNode;
  onChange: (html: string) => void;
}) {
  const div: RefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    if (div.current != null) {
      onChange(div.current?.innerHTML);
    }
  }, [children, onChange]);

  return (
    <div className="hidden" ref={div}>
      {children}
    </div>
  );
}
