import clsx from 'clsx';
import { FieldAttributes } from 'components/FieldAttributes/FieldAttributes';
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md';

export type TextFieldVariant = 'default' | 'black';

interface BaseProps {
  label?: React.ReactNode;
  error?: string | false;
  onLabelClick?: () => void;
  wrapperClassName?: string;
  inputSize?: InputSize;
  variant?: TextFieldVariant;
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
  inputSize = 'md',
  variant = 'default',
  ...props
}) => {
  const hasError = !!error;
  const classes = clsx(
    'ui-order-2 ui-border ui-border-solid ui-border-gray-300 dark:ui-border-gray-600 ui-text-gray-900 dark:ui-placeholder-gray-400 dark:ui-text-white ui-outline-none ui-rounded ui-w-full ui-text-sm ui-transition disabled:ui-bg-disabled disabled:ui-text-disabled-2',
    {
      'ui-p-3': multiline,
      'ui-h-14 ui-px-6': !multiline && inputSize === 'md',
      'ui-h-10 ui-px-3': !multiline && inputSize === 'sm',
      'ui-cursor-not-allowed': props.disabled,
      'focus:ui-border-primary focus:dark:ui-border-primary active:dark:ui-border-primary':
        !props.disabled,
      'ui-bg-gray-50 dark:ui-bg-dark-blue': variant === 'default' && !props.disabled,
      'ui-bg-black': variant === 'black' && !props.disabled,
      'ui-border-black-200 dark:ui-border-black-400': !hasError,
      'ui-border-red-400 dark:ui-border-red-400 focus:ui-border-red-400 ui-text-red-400 dark:ui-text-red-400':
        hasError
    },
    className
  );

  return (
    <FieldAttributes
      className={clsx('ui-textfield-wrapper', wrapperClassName, {
        'ui-opacity-50': props.disabled
      })}
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
