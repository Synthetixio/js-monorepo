import clsx from 'clsx';
import { Card, CardVariant } from 'components/Card/Card';
import { ArrowDropdownDownIcon } from 'components/Icons/ArrowDropdownDownIcon';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export interface AccordionProps {
  flat?: boolean;
  title: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  variant?: CardVariant;
}

export const Accordion: React.FC<AccordionProps> = ({
  flat = false,
  title,
  children,
  className,
  variant
}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => setIsActive((previous) => !previous);

  const nodeRef = useRef(null);
  return (
    <Card className={className} variant={variant}>
      <div
        className={clsx('ui-flex ui-justify-between ui-items-center ui-select-none', {
          'ui-cursor-default': flat
        })}
        role='button'
        tabIndex={0}
        onClick={toggleIsActive}
        onKeyDown={toggleIsActive}
      >
        <h3 className='ui-tg-body'>{title}</h3>
        {!flat && (
          <ArrowDropdownDownIcon
            className={clsx(
              'ui-transition-transform ui-text-black-600 dark:ui-text-white ui-text-base',
              {
                'ui-transform ui-rotate-180 ': isActive
              }
            )}
          />
        )}
      </div>
      {/*  TODO: update the transition package */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <CSSTransition
        unmountOnExit
        classNames='ui-accordion'
        in={isActive || flat}
        nodeRef={nodeRef}
        timeout={300}
      >
        <div ref={nodeRef}>
          <br />
          {children}
        </div>
      </CSSTransition>
    </Card>
  );
};
