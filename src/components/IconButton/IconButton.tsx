import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  rounded?: boolean;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'dark-blue' | 'gray';
}

export const IconButton: React.FC<IconButtonProps> = ({
  isActive = false,
  children,
  className,
  rounded,
  size = 'xs',
  variant = 'dark-blue',
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(`ui-border ui-transition ui-ease-out`, className, {
        'ui-border-blue ui-bg-blue ui-text-blue': isActive,
        'ui-icon-button ui-bg-dark-blue ui-text-white hover:ui-brightness-125':
          !isActive && variant === 'dark-blue',
        'ui-icon-button ui-gradient-gray-2 ui-text-white': !isActive && variant === 'gray',
        'ui-rounded-full': rounded,
        'ui-rounded': !rounded,
        'ui-w-7 ui-h-7': size === 'xs',
        'ui-w-14 ui-h-14': size === 'md',
        'ui-w-10 ui-h-10': size === 'sm',
        'ui-w-16 ui-h-16': size === 'lg'
      })}
    >
      <div
        className={clsx('ui-h-full ui-w-full ui-flex ui-justify-center ui-items-center', {
          'ui-rounded-full': rounded,
          'ui-rounded': !rounded,
          'ui-darker-80': variant === 'dark-blue' || isActive
        })}
      >
        {children}
      </div>
    </button>
  );
};
