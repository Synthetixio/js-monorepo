import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

import classes from './Radio.module.scss';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({ className, label, onChange, disabled, ...props }) => {
  return (
    <div
      className={clsx(className, 'ui-flex ui-items-center ui-mr-4 ui-mb-4', classes.wrapper, {
        'ui-opacity-50': disabled
      })}
    >
      <input
        className='ui-hidden'
        disabled={disabled}
        type='radio'
        onChange={onChange}
        {...props}
      />
      <label
        className={clsx(
          'ui-flex ui-items-center ui-cursor-pointer dark:ui-text-white ui-select-none',
          {
            'ui-cursor-not-allowed': disabled
          }
        )}
        htmlFor={props.id}
      >
        <div className='ui-flex ui-items-center ui-justify-center ui-relative ui-w-5 ui-h-5 ui-inline-block ui-mr-2 ui-rounded-full ui-border ui-border-grey ui-flex-no-shrink'>
          <span className='ui-w-3 ui-h-3 ui-absolute ui-rounded-full' />
        </div>
        {label}
      </label>
    </div>
  );
};
