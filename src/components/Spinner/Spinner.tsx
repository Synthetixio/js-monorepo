import clsx from "clsx";

export interface SpinnerProps {
  variant?: "default" | "success" | "danger" | "custom";
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ variant = "default", className }) => {
  return (
    <i
      className={clsx(
        "ui-flex ui-w-5 ui-h-5 ui-rounded-full ui-bg-transparent ui-border-2 ui-border-solid ui-border-black-100 dark:ui-border-black-300 ui-animate-spin",
        {
          "ui-border-t-primary dark:ui-border-t-primary": variant === "default"
        },
        className
      )}
    />
  );
};
