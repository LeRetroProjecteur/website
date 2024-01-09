import { Titre } from "../typography/typography";

export default function PageHeader({ text }: { text: string }) {
  return (
    <div className="grow whitespace-break-spaces border-y bg-retro-green text-center lg:w-max lg:whitespace-nowrap lg:border-0 lg:bg-white lg:pl-20px lg:text-left">
      <Titre>{text}</Titre>
    </div>
  );
}
