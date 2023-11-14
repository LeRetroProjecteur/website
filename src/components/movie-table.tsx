"use client";

import { ReactElement } from "react";

export default function MovieTable({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="wrapper">
      <div className="profile">
        <table id="userdata" className="center">
          <thead>
            <tr>
              <th
                style={{
                  width: "50%",
                  backgroundColor: "var(--red)",
                  color: "var(--white)",
                }}
              >
                <strong>Film</strong>
              </th>
              <th
                style={{
                  width: "50%",
                  backgroundColor: "var(--red)",
                  color: "var(--white)",
                }}
              >
                <strong>Séances</strong>
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}
