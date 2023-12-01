export default function PageHeader({ text }: { text: string }) {
  return (
    <div className="border-retro-gray bg-retro-green font-degular text-retro-gray grow whitespace-break-spaces border-y py-2 text-center text-5xl/8 font-extrabold uppercase lg:w-max lg:whitespace-nowrap lg:border-0 lg:bg-white lg:py-0 lg:pl-5 lg:text-left lg:text-8xl lg:leading-[65px]">
      {text}
    </div>
  );
}
