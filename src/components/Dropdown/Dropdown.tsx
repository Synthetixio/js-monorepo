import clsx from 'clsx';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { cloneElement, isValidElement, ReactNode, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export interface TriggerElementPropsParams {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  toggleDropdown: () => void;
}

export interface DropdownProps {
  width?: 'sm' | 'md' | 'custom';
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  triggerElement: ReactNode;
  triggerElementProps?: ({
    isOpen,
    handleOpen,
    handleClose,
    toggleDropdown
  }: TriggerElementPropsParams) => Record<string, unknown>;
  contentAlignment?: 'left' | 'right';
  renderFunction?: (triggerElementProps: TriggerElementPropsParams) => React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  width = 'sm',
  children,
  className,
  triggerElement,
  triggerElementProps,
  contentAlignment = 'left',
  contentClassName = 'ui-gradient-primary',
  renderFunction,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((previous) => !previous);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, handleClose);

  return (
    <div ref={ref} className={clsx('ui-relative ui-inline-flex', className)}>
      {isValidElement(triggerElement) &&
        cloneElement(triggerElement, {
          onClick: toggleDropdown,
          ...triggerElementProps?.({ isOpen, handleOpen, handleClose, toggleDropdown })
        })}
      {/*  TODO: update the transition package */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <CSSTransition unmountOnExit classNames='ui-fade' in={isOpen} nodeRef={nodeRef} timeout={200}>
        <div
          ref={nodeRef}
          {...props}
          className={clsx(
            contentClassName,
            'ui-absolute ui-dark:bg-gray-900 ui-rounded ui-z-50 ui-shadow-md ui-top-full ui-mt-2 ui-overflow-hidden',
            {
              'ui-right-0': contentAlignment === 'right',
              'ui-w-56': width === 'sm',
              'ui-w-80': width === 'md'
            }
          )}
        >
          {renderFunction
            ? renderFunction({ isOpen, handleOpen, handleClose, toggleDropdown })
            : children}
        </div>
      </CSSTransition>
    </div>
  );
};
