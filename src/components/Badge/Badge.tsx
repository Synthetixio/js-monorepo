import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'success' | 'blue' | 'pink' | 'pink' | 'orange' | 'red' | 'yellow';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  className?: string;
  defaultClass?: string;
  children?: ReactNode;
}

const badgeColors = {
  success: 'ui-border-green ui-bg-green ui-text-green',
  blue: 'ui-border-blue ui-bg-blue ui-text-blue',
  pink: 'ui-border-pink ui-bg-pink ui-text-pink',
  orange: 'ui-border-orange ui-bg-orange ui-text-orange',
  red: 'ui-border-red ui-bg-red ui-text-red',
  yellow: 'ui-border-yellow ui-bg-yellow ui-text-yellow'
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  defaultClass = 'ui-tg-caption-sm ui-font-semibold ui-px-2.5 ui-py-0.5',
  variant = 'sucess',
  children,
  ...props
}) => {
  return (
    <span
      className={clsx(
        className,
        'ui-rounded ui-inline-flex ui-border',
        badgeColors[variant as BadgeVariant]
      )}
    >
      <span {...props} className={clsx(defaultClass, 'ui-darker-80 ui-rounded')}>
        {children}
      </span>
    </span>
  );
};
