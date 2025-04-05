import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {
  children?: ReactNode;
}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-pink-600 text-white rounded-md p-2 hover:cursor-pointer hover:bg-pink-700 transition duration-200 ease-in-out",
        className
      )}
      {...props}
    >
      {children || "Submit"}
    </button>
  );
}
