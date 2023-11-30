export default function PageHeader({ text }: { text: string }) {
  return (
    <div className="grow whitespace-break-spaces border-y border-retro-gray bg-retro-green py-4 text-center font-degular text-5xl font-extrabold uppercase text-retro-gray">
      {text}
    </div>
  );
}