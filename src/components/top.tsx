"use client";

export default function Top({
  first_index,
  name,
  role,
  top,
}: {
  first_index: number;
  name: React.ReactNode;
  role: React.ReactNode;
  top: React.ReactNode[][];
}) {
  return (
    <div
      style={{
        width: "min(95%, 325px)",
        minHeight: "425px",
        backgroundColor: "var(--lightred)",
        border: "3px solid var(--red)",
        padding: "4px",
        margin: "3px",
        display: "inline-block",
        verticalAlign: "middle",
      }}
    >
      <h4>
        {name} <i>{role}</i>
      </h4>
      <ol
        start={first_index + 1}
        style={{
          paddingLeft: "27px",
          margin: "0",
          textAlign: "left",
          fontSize: "15px",
        }}
      >
        {top.map((film, index) => (
          <li key={index}>
            <i>{film[0]}</i>, {film[1]}
          </li>
        ))}
      </ol>
    </div>
  );
}
