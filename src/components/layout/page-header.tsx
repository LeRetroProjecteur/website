export default function PageHeader({ text }: { text: string }) {
  return (
    <div className="border-retro-gray bg-retro-green font-degular text-retro-gray grow whitespace-break-spaces border-y py-4 text-center text-5xl font-extrabold uppercase lg:border-0 lg:bg-white lg:py-0 lg:pl-5 lg:text-left lg:text-8xl">
      {text}
    </div>
  );
}
