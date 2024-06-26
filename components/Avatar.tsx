import * as React from "preact/compat";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as AltAvatarPrimitive from "../lib/components/avatar.d.ts";

import { cn } from "../lib/util.ts";

import { ComponentPropsWithoutRef, ElementRef } from "../lib/type-utils.ts";

const Avatar = React.forwardRef<
  ElementRef<typeof AltAvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AltAvatarPrimitive.Root>
>(({ class: className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displnayName;

const AvatarImage = React.forwardRef<
  ElementRef<typeof AltAvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AltAvatarPrimitive.Image>
>(({ class: className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  ElementRef<typeof AltAvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AltAvatarPrimitive.Fallback>
>(({ class: className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
