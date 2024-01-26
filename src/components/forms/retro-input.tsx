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
  leftAlignPlaceholder,
  transparentPlaceholder,
  grayText,
  customHeight,
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
  customHeight?: boolean;
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
          "placeholder:text-center": !(leftAlignPlaceholder ?? false),
          "placeholder:text-left": leftAlignPlaceholder,
          "placeholder:text-retro-gray": !(transparentPlaceholder ?? false),
          "placeholder:text-retro-gray-transparent": transparentPlaceholder,
          "text-retro-black": !(grayText ?? false),
          "text-retro-gray": grayText,
          "h-33px lg:h-48px": !(customHeight ?? false),
        },
        "grow border py-1px focus:border-retro-gray focus:outline-0 focus:ring-0 focus:placeholder:opacity-0 ",
      )}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
