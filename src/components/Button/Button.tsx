import clsx from "clsx";
import { Spinner } from "components/Spinner/Spinner";
import { ButtonHTMLAttributes } from "react";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  loading?: boolean;
  variant?: "default" | "success" | "danger" | "custom";
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
        `ui-flex ui-items-center ui-justify-center ui-text-white ui-text-sm ui-font-bold ui-leading-5 ui-h-12 ui-px-2 ui-rounded-2lg
         disabled:ui-opacity-50 disabled:ui-cursor-not-allowed dark:ui-border dark:ui-border-solid ui-transition ui-ease-out ui-group
         disabled:ui-text-white disabled:ui-bg-disabled`,
        {
          "hover:ui-brightness-105": !disabled && !loading,
          "ui-gradient-primary": variant === "default",
          "lg:ui-h-14 lg:ui-min-w-button-lg": size === "lg",
          "lg:ui-min-w-button-md": size === "md",
          "lg:ui-min-w-button-sm": size === "sm",
          "ui-h-14 ui-min-w-button-lg": mobileSize === "lg",
          "ui-min-w-button-md": mobileSize === "md",
          "ui-min-w-button-sm": mobileSize === "sm"
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <div className="ui-flex ui-justify-center ui-items-center ui-h-full">
        {loading && <Spinner className={clsx("ui-mr-2", spinnerClassName)} variant={variant} />}
        {children}
      </div>
    </button>
  );
};
