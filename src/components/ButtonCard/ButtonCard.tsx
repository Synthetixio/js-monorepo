import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export interface ButtonCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
  direction?: "left" | "right";
  headline: string;
  subline?: string;
  sublineFirst?: boolean;
}

export const ButtonCard: React.FC<ButtonCardProps> = ({
  direction = "right",
  headline,
  subline,
  onClick,
  className,
  sublineFirst,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        className,
        "ui-gradient-rainbow ui-rounded ui-w-full ui-cursor-pointer ui-p-[1px]"
      )}
      onClick={onClick}
      {...rest}
    >
      <div className="ui-bg-dark-blue ui-relative ui-rounded ui-p-6">
        <div className="ui-flex ui-flex-col">
          <h4
            className={clsx("ui-tg-main ui-text-gray-650 ui-w-full", {
              "ui-text-left": direction === "left",
              "ui-text-right": direction === "right",
              "ui-order-2": !sublineFirst
            })}
          >
            {subline}
          </h4>
          <h3
            className={clsx("ui-tg-title-h5 ui-text-white ui-w-full", {
              "ui-text-left": direction === "left",
              "ui-text-right": direction === "right",
              "ui-order-1": !sublineFirst
            })}
          >
            {headline}
          </h3>
        </div>

        <div
          className={clsx("ui-absolute ui-top-1/2 ui--translate-y-1/2", {
            "ui-left-8": direction === "right",
            "ui-right-8 ui-rotate-180": direction === "left"
          })}
        >
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 16L7 12L11 8"
              stroke="#00D1FF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M7 12H17.3291"
              stroke="#00D1FF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </button>
  );
};
