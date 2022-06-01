import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  rounded?: boolean;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  isActive = false,
  children,
  className,
  rounded,
  size = 'md',
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        `ui-text-white ui-transition-colors ui-ease-out ui-bg-gray ui-p-[1px]`,
        className,
        {
          'ui-bg-primary': isActive,
          'ui-rounded-full': rounded,
          'ui-rounded': !rounded,
          'ui-w-14 ui-h-14': size === 'md',
          'ui-w-10 ui-h-10': size === 'sm',
          'ui-w-16 ui-h-16': size === 'lg'
        }
      )}
    >
      <div
        className={clsx(
          'ui-border ui-border-solid ui-border-black ui-bg-gray ui-w-full ui-h-full ui-flex ui-justify-center ui-items-center',
          {
            'ui-rounded-full': rounded,
            'ui-rounded': !rounded
          }
        )}
      >
        {children}
      </div>
    </button>
  );
};
