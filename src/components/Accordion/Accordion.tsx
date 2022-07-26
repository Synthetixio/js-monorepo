import clsx from 'clsx';
import { Card, CardVariant } from 'components/Card/Card';
import { Icon } from 'components/Icon/Icon';
import { IconButton } from 'components/IconButton/IconButton';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export interface AccordionProps {
  flat?: boolean;
  title: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  children?: React.ReactNode;
  variant?: CardVariant;
}

export const Accordion: React.FC<AccordionProps> = ({
  flat = false,
  title,
  children,
  className = 'ui-p-4 sm:ui-p-4',
  variant,
  wrapperClassName = '',
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => setIsActive((previous) => !previous);

  const nodeRef = useRef(null);
  return (
    <Card className={className} variant={variant} wrapperClassName={wrapperClassName} {...props}>
      <div
        className={clsx(
          'ui-flex ui-outline-none ui-justify-between ui-items-center ui-select-none',
          {
            'ui-cursor-default': flat
          }
        )}
        role='button'
        tabIndex={0}
        onClick={toggleIsActive}
        onKeyDown={toggleIsActive}
      >
        <h3 className='ui-tg-body'>{title}</h3>
        {!flat && (
          <IconButton rounded size='sm'>
            <Icon
              className={clsx('ui-transition-transform ui-text-primary ui-text-base', {
                'ui-transform ui-rotate-180 ': isActive
              })}
              name='Bottom-3'
            />
          </IconButton>
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
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    </Card>
  );
};
