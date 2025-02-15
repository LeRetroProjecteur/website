import clsx from "clsx";
import { ChangeEvent, useCallback } from "react";

export default function RetroInput({
  value,
  setValue,
  placeholder,
  blue,
  name,
  customTypography = false,
  className,
  leftAlignPlaceholder,
  transparentPlaceholder,
  grayText,
  lowercase = false,
}: {
  value: string;
  setValue: (newValue: string) => void;
  placeholder: string;
  blue?: boolean;
  name?: string;
  customTypography?: boolean;
  className?: string;
  leftAlignPlaceholder?: boolean;
  transparentPlaceholder?: boolean;
  grayText?: boolean;
  lowercase?: boolean;
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
          "bg-retro-pale-blue": blue,
          "text-17px font-medium leading-25px lg:text-20px lg:leading-21px":
            !customTypography,
          uppercase: !lowercase && !customTypography,
          "placeholder:text-center": !(leftAlignPlaceholder ?? false),
          "placeholder:text-left": leftAlignPlaceholder,
          "placeholder:text-retro-gray": !(transparentPlaceholder ?? false),
          "placeholder:text-retro-gray-transparent": transparentPlaceholder,
          "text-retro-black": !(grayText ?? false),
          "text-retro-gray": grayText,
        },
        "flex grow items-center border focus:border-retro-gray focus:outline-0 focus:ring-0 focus:placeholder:opacity-0",
      )}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
