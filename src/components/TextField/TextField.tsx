import clsx from "clsx";
import { FieldAttributes } from "components/FieldAttributes/FieldAttributes";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  label?: React.ReactNode;
  error?: string | false;
  onLabelClick?: () => void;
  wrapperClassName?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  multiline?: false;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseProps {
  multiline: true;
}

export type TextFieldProps = InputProps | TextAreaProps;

export const TextField: React.FC<TextFieldProps> = ({
  className,
  multiline = false,
  label,
  error,
  onLabelClick,
  wrapperClassName,
  ...props
}) => {
  const hasError = !!error;
  const classes = clsx(
    `ui-border ui-border-solid ui-bg-gray-50 ui-border-gray-300 ui-text-gray-900 dark:ui-bg-gray-700 dark:ui-border-gray-600 dark:ui-placeholder-gray-400 dark:ui-text-white ui-outline-none ui-rounded ui-px-5 ui-w-full ui-text-sm`,
    {
      "ui-py-3": multiline,
      "ui-h-12": !multiline,
      "ui-cursor-not-allowed": props.disabled,
      "ui-border-black-200 ui-dark:border-black-400 ui-focus:border-navy": !hasError,
      "ui-border-red-400 dark:ui-border-red-400 focus:ui-border-red-400 ui-text-red-400 dark:ui-text-red-400":
        hasError
    },
    className
  );

  return (
    <FieldAttributes
      className={wrapperClassName}
      error={error}
      label={label}
      onLabelClick={onLabelClick}
    >
      {multiline ? (
        <textarea className={classes} rows={4} {...(props as TextAreaProps)} />
      ) : (
        <input className={classes} {...(props as InputProps)} />
      )}
    </FieldAttributes>
  );
};
