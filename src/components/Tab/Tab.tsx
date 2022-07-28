import clsx from 'clsx';
import React from 'react';

export type TabProps = {
  text: React.ReactNode;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  testId?: string;
  id: string;
};

export const Tab: React.FC<TabProps> = ({
  text,
  active,
  onClick,
  disabled,
  className,
  testId,
  id
}) => (
  <button
    className={clsx(
      'ui-transition ui-border ui-border-transparent ui-ease-out ui-rounded-[100px] ui-px-2 ui-py-1.5 ui-whitespace-nowrap',
      {
        'ui-text-primary': !active,
        'ui-bg-primary ui-text-white': active,
        'ui-cursor-pointer': !disabled,
        'hover:ui-border-primary': !disabled && !active,
        'ui-opacity-50 ui-cursor-not-allowed': disabled
      },
      className
    )}
    data-testid={testId}
    id={id}
    onClick={onClick}
  >
    {text}
  </button>
);
