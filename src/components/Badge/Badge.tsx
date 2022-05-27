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
  success: 'ui-border ui-border-green ui-bg-green ui-text-green ui-text-xs'
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  defaultClass = 'ui-text-xs ui-font-semibold ui-px-2.5 ui-py-0.5',
  variant = 'sucess',
  children,
  ...props
}) => {
  return (
    <span
      className={clsx(className, 'ui-rounded ui-inline-flex', badgeColors[variant as BadgeVariant])}
    >
      <span {...props} className={clsx(defaultClass, 'ui-darker-40 ui-rounded')}>
        {children}
      </span>
    </span>
  );
};
