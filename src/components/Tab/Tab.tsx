import clsx from 'clsx';
import React from 'react';

export type TabProps = {
  text: React.ReactNode;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
};

export const Tab: React.FC<TabProps> = ({ text, active, onClick, disabled, className }) => (
  <button
    className={clsx(
      'ui-transition ui-border ui-border-transparent ui-ease-out ui-min-w-button-md ui-rounded-[100px] dark:ui-text-white ui-px-2.5 ui-py-2 ui-whitespace-nowrap',
      {
        'ui-text-black-700 ui-bg-primary': active,
        'ui-cursor-pointer': !disabled,
        'hover:ui-border-primary hover:ui-text-primary': !disabled && !active,
        'ui-opacity-50 ui-cursor-not-allowed': disabled
      },
      className
    )}
    type="button"
    onClick={onClick}
  >
    {text}
  </button>
);
