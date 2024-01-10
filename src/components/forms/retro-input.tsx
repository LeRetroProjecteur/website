import { ChangeEvent, useCallback } from "react";

export default function RetroInput({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: (newValue: string) => void;
  placeholder: string;
}) {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    [setValue],
  );

  return (
    <input
      type="text"
      className="lg:py-8px lg:text-20px text-15px lg:leading-21px leading-25px py-1px grow border bg-retro-pale-green font-medium uppercase text-retro-black placeholder:text-center placeholder:text-retro-gray focus:border-retro-gray focus:outline-0 focus:ring-0 focus:placeholder:opacity-0"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
