import clsx from 'clsx';
import { ButtonVariant } from 'components/Button/Button';

export interface SpinnerProps {
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({ variant = 'default', disabled, className }) => {
  return (
    <i
      className={clsx(
        'ui-flex ui-w-5 ui-h-5 ui-rounded-full ui-bg-transparent ui-border-2 ui-border-solid ui-border-black-100 dark:ui-border-gray-400 ui-animate-spin',
        {
          'ui-border-t-green dark:ui-border-t-green':
            variant === 'default' || variant === 'outline',
          'ui-border-t-navy-light-2 dark:ui-border-t-navy-light-2': variant === 'secondary',
          'ui-border-t-pink-dark-2 dark:ui-border-t-pink-dark-2': variant === 'purple',
          'ui-border-t-disabled dark:ui-border-t-disabled': disabled
        },
        className
      )}
    />
  );
};
