import clsx from "clsx";
import { ButtonVariant } from "components/Button/Button";

export interface SpinnerProps {
  variant?: ButtonVariant;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ variant = "default", className }) => {
  return (
    <i
      className={clsx(
        "ui-flex ui-w-5 ui-h-5 ui-rounded-full ui-bg-transparent ui-border-2 ui-border-solid ui-border-black-100 dark:ui-border-gray-400 ui-animate-spin",
        {
          "ui-border-t-green dark:ui-border-t-green":
            variant === "default" || variant === "outline",
          "ui-border-t-navy dark:ui-border-t-navy": variant === "secondary",
          "ui-border-t-purple dark:ui-border-t-purple": variant === "purple"
        },
        className
      )}
    />
  );
};
