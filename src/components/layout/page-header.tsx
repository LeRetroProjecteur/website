export default function PageHeader({ text }: { text: string }) {
  return (
    <div className="text-retro-gray bg-retro-green border-retro-gray font-degular grow whitespace-break-spaces border-y py-4 text-center text-5xl font-extrabold uppercase">
      {text}
    </div>
  );
}
