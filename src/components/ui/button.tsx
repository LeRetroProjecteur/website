import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "h-42px grow cursor-pointer border text-center text-20px font-medium uppercase hover:bg-retro-blue hover:text-retro-gray lg:h-48px flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-retro-gray text-retro-blue",
        outline: "bg-transparent border-retro-gray text-retro-gray",
      },
      iconStyle: {
        noIcon: "",
        iconOnly: "w-42px lg:w-48px",
      },
    },
    defaultVariants: { variant: "default", iconStyle: "noIcon" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, iconStyle, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ className, variant, iconStyle }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
