import clsx from 'clsx';
import { Icon } from 'components/Icon/Icon';

export interface ExternalLinkProps {
  className?: string;
  link: string;
  text: React.ReactNode;
  withoutIcon?: boolean;
  border?: boolean;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  className,
  link,
  text,
  withoutIcon,
  border
}) => {
  return (
    <a
      className={clsx(
        className,
        'ui-py-2 ui-px-2 ui-rounded ui-inline-flex ui-items-center ui-text-primary hover:ui-brightness-110 ui-transition ui-ease-out',
        {
          'ui-border ui-border-primary': border
        }
      )}
      href={link}
      rel='noreferrer noopener'
      target='_blank'
    >
      {text}
      {!withoutIcon && <Icon className='ui-ml-1' name='Link-off' />}
    </a>
  );
};
