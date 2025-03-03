import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "py-4px leading-31px lg:py-8px grow cursor-pointer border text-center text-20px font-medium uppercase hover:bg-retro-blue hover:text-retro-gray lg:h-48px flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-retro-gray text-retro-blue",
        outline: "bg-transparent border-retro-gray text-retro-gray",
      },
      iconStyle: {
        noIcon: "",
        iconOnly: "w-42px h-42px lg:h-48px lg:w-48px",
      },
      padding: {
        default: "",
        padded: "px-10px",
      },
    },
    defaultVariants: {
      variant: "default",
      iconStyle: "noIcon",
      padding: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, iconStyle, padding, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ className, variant, iconStyle, padding }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
