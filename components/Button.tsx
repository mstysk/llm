import { JSX } from "preact";
import { cn } from "../lib/util.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      class={cn(
        "px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors",
        props.class,
      )}
    />
  );
}
