import * as React from "preact/compat";
import {
  ComponentPropsWithoutRef,
  PrimitiveForwardRefComponent,
} from "../type-utils.ts";

type PrimitiveSpanProps = ComponentPropsWithoutRef<
  PrimitiveForwardRefComponent<"span">
>;

interface AvatarProps extends PrimitiveSpanProps {
}

export const Root: React.ForwardRefExoticComponent<
  AvatarProps & React.RefAttributes<HTMLSpanElement>
>;

interface AvatarFallbackProps extends PrimitiveSpanProps {
  delayMs?: number;
}

export const Fallback: React.ForwardRefExoticComponent<
  AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>
>;

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";
type PrimitiveImageProps = ComponentPropsWithoutRef<
  PrimitiveForwardRefComponent<"img">
>;

interface AvatarImageProps extends PrimitiveImageProps {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

export const Image: React.ForwardRefExoticComponent<
  AvatarImageProps & React.RefAttributes<HTMLImageElement>
>;
