import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function InputField({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={twMerge(
        "bg-neutral-800 text-white border border-neutral-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    />
  );
}
