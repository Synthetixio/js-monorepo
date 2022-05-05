import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  label,
  checked,
  onChange,
  ...props
}) => {
  return (
    <div className="ui-checkbox ui-flex">
      <label className={clsx("ui-inline-flex ui-flex-row ui-items-center", className)}>
        <div
          className={clsx(
            "ui-transition-colors hover:ui-opacity-90 ui-relative ui-flex ui-items-center ui-justify-center ui-flex-shrink-0 ui-w-5 ui-h-5 ui-mr-2 ui-bg-white ui-rounded-sm ui-cursor-pointer ui-border ui-border-primary dark:ui-bg-black-500"
          )}
        >
          <input
            className="ui-absolute ui-opacity-0 ui-cursor-pointer ui-w-full ui-h-full"
            type="checkbox"
            {...props}
            checked={checked}
            onChange={onChange}
          />
          <svg
            className="ui-hidden ui-w-3.5 ui-h-3.5 ui-text-primary ui-pointer-events-none ui-fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
        {label && (
          <span className="ui-select-none ui-text-black-600 dark:ui-text-white ui-cursor-pointer">
            {label}
          </span>
        )}
      </label>
    </div>
  );
};
