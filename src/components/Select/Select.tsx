import clsx from 'clsx';
import { FieldAttributes, FieldAttributesProps } from 'components/FieldAttributes/FieldAttributes';
import { Icon } from 'components/Icon/Icon';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { ReactElement, useMemo, useRef, useState } from 'react';
import { Option } from 'types/option';

import classes from './Select.module.scss';

export interface SelectProps<T = Option> {
  value: T | string | number | null;
  options: T[];
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  fieldAttributesProps?: Omit<FieldAttributesProps, 'onLabelClick'>;
  onChange?: (option: T) => void;
  labelMapper?: (option: T) => React.ReactNode;
  valueMapper?: (option: T) => string | number;
  size?: 'sm' | 'md' | 'lg';
}

export const Select = <T,>({
  value,
  options,
  disabled,
  className,
  placeholder,
  fieldAttributesProps,
  onChange,
  size = 'md',
  labelMapper = (option: T) => (option as unknown as Option).label,
  valueMapper = (option: T) => (option as unknown as Option).value,
  ...props
}: SelectProps<T>): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const hasError = !!fieldAttributesProps?.error;
  const hasOptionsScroll = options.length > 4;

  const toggleIsOpen = () => {
    if (disabled) return;

    setIsOpen((previous) => !previous);
  };

  const openSelect = () => setIsOpen(true);
  const closeSelect = () => setIsOpen(false);

  const handleSelect = (option: T) => onChange?.(option);

  const label = useMemo(() => {
    if (typeof value === 'object' && value !== null) return labelMapper(value);

    const selected = options.find((item) => valueMapper(item) === value);
    return selected ? labelMapper(selected) : 'NA';
  }, [value, options, labelMapper, valueMapper]);

  useOnClickOutside(ref, closeSelect);

  return (
    <FieldAttributes {...fieldAttributesProps} onLabelClick={!isOpen ? openSelect : undefined}>
      <div
        ref={ref}
        className={clsx(
          `ui-border ui-border-solid ui-rounded ui-px-5 ui-w-full ui-relative
         ui-bg-white dark:ui-bg-dark-blue dark:ui-text-white ui-text-sm ui-flex ui-items-center
         ui-justify-between ui-select-none`,
          {
            'ui-cursor-not-allowed': disabled,
            'ui-border-black-200 dark:ui-border-black-400': !hasError || isOpen,
            'ui-border-red-400 ui-text-red-400 dark:ui-text-red-400': hasError && !isOpen,
            'ui-rounded-bl-none ui-rounded-br-none': isOpen,
            'ui-h-14': size === 'lg',
            'ui-h-12': size === 'md',
            'ui-h-8': size === 'sm'
          },
          className
        )}
        role='button'
        tabIndex={0}
        onClick={toggleIsOpen}
        onKeyDown={toggleIsOpen}
        {...props}
      >
        {value ? label : <span className='ui-text-black-300'>{placeholder}</span>}

        <Icon
          className={clsx('ui-transition-transform ui-text-black-200 dark:ui-text-white', {
            'ui-transform ui-rotate-180 ': isOpen
          })}
          name='Bottom-3'
        />
        {isOpen && (
          <div
            className={`ui-absolute ui-w-full ui--left-px ui-top-full ui-border ui-border-solid
          ui-border-black-200 dark:ui-border-black-400 ui-box-content ui-rounded-bl ui-rounded-br
          ui-bg-white dark:ui-bg-dark-blue ui-z-10`}
          >
            <ul className={clsx('ui-max-h-56 ui-overflow-auto', classes.scroll)}>
              {options.map((option, index) => (
                <li
                  key={valueMapper(option)}
                  className={clsx(
                    `dark:even:ui-bg-navy-dark-1 ui-border-b ui-border-solid ui-border-black-200 dark:ui-border-0
                   last:ui-border-b-0 hover:ui-bg-gray-100 dark:hover:ui-bg-navy
                   last:ui-rounded-bl`,
                    { 'last:ui-rounded-br': !hasOptionsScroll }
                  )}
                >
                  <div
                    className='ui-py-3 ui-px-5'
                    role='button'
                    tabIndex={index}
                    onClick={() => handleSelect(option)}
                    onKeyDown={() => handleSelect(option)}
                  >
                    {labelMapper(option)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </FieldAttributes>
  );
};
