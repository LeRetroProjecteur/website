"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50", className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentVariants = cva(
  "flex grow flex-col gap-[20px] bg-retro-blue p-20px drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]",
  {
    variants: {},
    defaultVariants: {},
  },
);

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof dialogContentVariants>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 flex w-screen translate-x-[-50%] translate-y-[-50%] items-center justify-center p-20px lg:w-[50vw]",
        className,
      )}
      {...props}
    >
      <div className={dialogContentVariants()}>{children}</div>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex items-center border-b pb-20px", className)}
    {...props}
  >
    <div className="min-h-v relative flex grow items-center justify-center px-20px">
      {children}
      <DialogPrimitive.Close className="absolute right-0 top-1/2 -translate-y-1/2 bg-retro-blue focus-visible:outline-none disabled:pointer-events-none">
        <svg
          className="h-22px w-22px fill-retro-gray stroke-retro-blue"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="22" height="22" />
          <line
            x1="4.79289"
            y1="16.8929"
            x2="16.793"
            y2="4.89282"
            strokeWidth="2"
          />
          <line
            x1="16.7931"
            y1="17.1072"
            x2="4.79306"
            y2="5.10712"
            strokeWidth="2"
          />
        </svg>
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </div>
  </div>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-center text-22px font-medium uppercase text-retro-gray",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-retro-gray", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
