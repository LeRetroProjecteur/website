"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:font-suisse group-[.toaster]:w-max group-[.toaster]:rounded-full group-[.toaster]:text-retro-black group-[.toaster]:bg-retro-blue group-[.toaster]:border-0 group-[.toaster]:rounded-none",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
