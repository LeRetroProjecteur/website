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
      className="border-retro-gray bg-retro-pale-green text-retro-black placeholder:text-retro-gray focus:border-retro-gray grow uppercase placeholder:text-center focus:outline-0 focus:ring-0 focus:placeholder:opacity-0"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
