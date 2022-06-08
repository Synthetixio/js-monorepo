import clsx from 'clsx';
import React from 'react';

export type SelectorProps = {
  text: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export const Selector: React.FC<SelectorProps> = ({ text, onClick, className }) => (
  <button
    className={clsx(
      'ui-flex ui-gap-2 ui-items-center ui-bg-dark-blue ui-transition ui-border ui-border-transparent ui-ease-out ui-min-w-button-md ui-rounded ui-text-primary ui-px-2.5 ui-py-2 ui-whitespace-nowrap',
      className
    )}
    type='button'
    onClick={onClick}
  >
    {text}
  </button>
);
