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
      className="grow border  bg-retro-pale-green py-0 uppercase leading-7 text-retro-black placeholder:text-center placeholder:text-retro-gray focus:border-retro-gray focus:outline-0 focus:ring-0 focus:placeholder:opacity-0 lg:py-8px lg:text-20px lg:font-medium lg:leading-21px"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
