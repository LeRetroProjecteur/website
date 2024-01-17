import clsx from "clsx";
import { ChangeEvent, useCallback } from "react";

export default function RetroInput({
  value,
  setValue,
  placeholder,
  blue,
  name,
  customTypography,
  className,
}: {
  value: string;
  setValue: (newValue: string) => void;
  placeholder: string;
  blue?: boolean;
  name?: string;
  customTypography?: boolean;
  className?: string;
}) {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    [setValue],
  );

  return (
    <input
      {...{ name }}
      type="text"
      className={clsx(
        className,
        {
          "bg-retro-pale-green": !(blue ?? false),
          "bg-retro-blue": blue,
          "text-15px font-medium uppercase leading-25px lg:text-20px lg:leading-21px":
            !(customTypography ?? false),
        },
        "grow border py-1px text-retro-black placeholder:text-center placeholder:text-retro-gray focus:border-retro-gray focus:outline-0 focus:ring-0 focus:placeholder:opacity-0 lg:py-8px ",
      )}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
