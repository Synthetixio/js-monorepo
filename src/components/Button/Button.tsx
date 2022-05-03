import clsx from "clsx";
import { Spinner } from "components/Spinner/Spinner";
import { ButtonHTMLAttributes } from "react";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  loading?: boolean;
  variant?: "default" | "outline" | "secondary" | "custom";
  mobileSize?: ButtonSize;
  spinnerClassName?: string;
}

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  loading = false,
  variant = "default",
  mobileSize = size,
  children,
  className,
  spinnerClassName,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        `ui-border ui-flex ui-items-center ui-justify-center ui-font-bold ui-leading-5 ui-px-2 ui-rounded
         disabled:ui-bg-opacity-65 ui-transition ui-ease-out ui-group
         disabled:ui-cursor-not-allowed disabled:ui-text-disabled disabled:ui-bg-disabled disabled:ui-border-disabled-2`,
        {
          "hover:ui-brightness-110 ui-border-transparent": !disabled && !loading,
          "ui-text-black ui-gradient-primary": variant === "default" && !disabled && !loading,
          "ui-text-white ui-bg-navy": variant === "secondary",
          "ui-gradient-primary ui-bg-clip-text ui-text-fill-transparent": variant === "outline",
          "lg:ui-h-12 lg:ui-min-w-button-lg lg:ui-text-sm": size === "lg",
          "lg:ui-h-10 lg:ui-min-w-button-md lg:ui-text-sm": size === "md",
          "lg:ui-h-7 lg:ui-min-w-button-sm lg:ui-text-xs": size === "sm",
          "ui-h-12 ui-min-w-button-lg ui-text-sm": mobileSize === "lg",
          "ui-h-10 ui-min-w-button-md ui-text-sm": mobileSize === "md",
          "ui-h-7 ui-min-w-button-sm ui-text-xs": mobileSize === "sm"
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <div className="ui-flex ui-justify-center ui-items-center ui-h-full">
        {loading && <Spinner className={clsx("ui-mr-2", spinnerClassName)} variant="default" />}
        {children}
      </div>
    </button>
  );
};
