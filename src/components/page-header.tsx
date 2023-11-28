export default function PageHeader({ text }: { text: string }) {
  return (
    <div className="grow text-center whitespace-break-spaces font-extrabold text-retro-gray text-5xl bg-retro-green border-y border-retro-gray uppercase py-4 font-degular">
      {text}
    </div>
  );
}
