import clsx from "clsx";
import { forwardRef, ReactNode } from "react";

export interface Props {
  className?: string;
  defaultClass?: string;
  children?: ReactNode;
  variant?:
    | "default"
    | "gray"
    | "standard"
    | "primary"
    | "blue"
    | "purple"
    | "orange"
    | "pink"
    | "rainbow";
}

const CardRender: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
  {
    className = "",
    defaultClass = "ui-rounded ui-my-2 ui-p-4 sm:ui-p-6",
    children,
    variant = "default"
  },
  ref
) => {
  return (
    <div
      ref={ref}
      className={clsx("ui-shadow-md", className, defaultClass, {
        "ui-gradient-gray-2 ui-text-white": variant === "default",
        "ui-gradient-gray-1 ui-text-white": variant === "gray",
        "ui-gradient-primary": variant === "primary",
        "ui-gradient-blue ui-text-white": variant === "blue",
        "ui-gradient-purple ui-text-white": variant === "purple",
        "ui-gradient-orange ui-text-white": variant === "orange",
        "ui-gradient-pink ui-text-white": variant === "pink",
        "ui-gradient-rainbow ui-text-white": variant === "rainbow",
        "ui-border dark:ui-border-black ui-bg-white ui-border-gray-200 dark:ui-bg-gray-800 dark:ui-text-white":
          variant === "standard"
      })}
    >
      {children}
    </div>
  );
};

export const Card = forwardRef(CardRender);
