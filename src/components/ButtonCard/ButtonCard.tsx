import clsx from 'clsx';
import { Icon, SynthetixIcon } from 'components/Icon/Icon';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
  direction?: 'left' | 'right';
  iconDirection?: 'top' | 'middle' | 'bottom';
  icon?: SynthetixIcon;
  headline: React.ReactNode;
  subline?: React.ReactNode;
  sublineFirst?: boolean;
}

export const ButtonCard: React.FC<ButtonCardProps> = ({
  direction = 'left',
  iconDirection = 'top',
  icon = 'Link-off',
  headline,
  subline,
  onClick,
  className,
  sublineFirst,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        className,
        'ui-from-pink ui-to-primary ui-rounded ui-w-full ui-cursor-pointer ui-p-[1px]',
        {
          'ui-bg-gradient-to-r': direction === 'left',
          'ui-bg-gradient-to-l': direction === 'right'
        }
      )}
      onClick={onClick}
      {...rest}
    >
      <div className='ui-bg-dark-blue ui-relative ui-rounded ui-p-6 ui-h-full'>
        <div
          className={clsx('ui-flex ui-flex-col', {
            'ui-mr-5': direction === 'left',
            'ui-ml-5': direction === 'right'
          })}
        >
          {subline && (
            <h4
              className={clsx('ui-tg-main ui-text-gray-650 ui-w-full ui-break-words', {
                'ui-text-left': direction === 'left',
                'ui-text-right': direction === 'right',
                'ui-order-2': !sublineFirst
              })}
            >
              {subline}
            </h4>
          )}
          <h3
            className={clsx('ui-tg-title-h5 ui-text-white ui-w-full ui-break-words', {
              'ui-text-left': direction === 'left',
              'ui-text-right': direction === 'right',
              'ui-order-1': !sublineFirst
            })}
          >
            {headline}
          </h3>
        </div>

        <div
          className={clsx('ui-absolute', {
            'ui-left-4 -ui-rotate-90': direction === 'right',
            'ui-right-4': direction === 'left',
            'ui-top-1/2 ui--translate-y-1/2': iconDirection === 'middle',
            'ui-top-5': iconDirection === 'top',
            'ui-bottom-5': iconDirection === 'bottom'
          })}
        >
          <Icon className='ui-text-2xl ui-text-primary' name={icon} />
        </div>
      </div>
    </button>
  );
};
