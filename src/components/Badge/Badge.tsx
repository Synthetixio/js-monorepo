import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'success';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  className?: string;
  defaultClass?: string;
  children?: ReactNode;
}

const badgeColors = {
  success: 'bg-green-light-3 text-green text-xs'
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  defaultClass = 'text-xs font-semibold px-2.5 py-0.5 rounded',
  variant = 'sucess',
  children,
  ...props
}) => {
  return (
    <span
      {...props}
      className={clsx(className, defaultClass, badgeColors[variant as BadgeVariant])}
    >
      {children}
    </span>
  );
};
