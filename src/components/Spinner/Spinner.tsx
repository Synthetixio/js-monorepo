import clsx from "clsx";

export interface SpinnerProps {
  variant?: "default" | "success" | "danger" | "custom";
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ variant = "default", className }) => {
  return (
    <i
      className={clsx(
        "ui-flex ui-w-6 ui-h-6 ui-rounded-full ui-bg-transparent ui-border-2 ui-border-solid ui-border-black-100 dark:ui-border-black-300 ui-animate-spin",
        {
          "ui-border-t-yellow-700 dark:ui-border-t-yellow-700": variant === "default",
          "ui-border-t-green-700 dark:ui-border-t-green-700": variant === "success",
          "ui-border-t-red-700 dark:ui-border-t-red-700": variant === "danger"
        },
        className
      )}
    />
  );
};
