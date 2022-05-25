import clsx from "clsx";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

export type CardVariant =
  | "default"
  | "gray"
  | "standard"
  | "primary"
  | "blue"
  | "purple"
  | "orange"
  | "pink"
  | "dark-blue"
  | "rainbow";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: string;
  className?: string;
  wrapperClassName?: string;
  children?: ReactNode;
  variant?: CardVariant;
  showBorder?: boolean;
}

const CardRender: React.ForwardRefRenderFunction<HTMLDivElement, CardProps> = (
  {
    className = "",
    wrapperClassName = "ui-my-2",
    children,
    variant = "default",
    rounded = "ui-rounded",
    showBorder = false,
    ...props
  },
  ref
) => {
  return (
    <div
      ref={ref}
      className={clsx("ui-shadow-md ui-p-[1px]", rounded, wrapperClassName, {
        "ui-gradient-gray-2 ui-text-white": variant === "default",
        "ui-gradient-gray-1 ui-text-white": variant === "gray",
        "ui-gradient-primary": variant === "primary",
        "ui-gradient-blue ui-text-white": variant === "blue",
        "ui-gradient-purple ui-text-white": variant === "purple",
        "ui-gradient-orange ui-text-white": variant === "orange",
        "ui-gradient-pink ui-text-white": variant === "pink",
        "ui-gradient-rainbow ui-text-white": variant === "rainbow",
        "ui-bg-dark-blue ui-text-white": variant === "dark-blue",
        "ui-border dark:ui-border-black ui-bg-white ui-border-gray-200 dark:ui-bg-gray-800 dark:ui-text-white":
          variant === "standard"
      })}
      {...props}
    >
      <div
        className={clsx("ui-h-full ui-w-full ui-p-4 sm:ui-p-5", rounded, className, {
          "ui-border-2 ui-border-black": variant === "default" && showBorder
        })}
      >
        {children}
      </div>
    </div>
  );
};

export const Card = forwardRef(CardRender);
