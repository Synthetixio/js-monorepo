import clsx from 'clsx';
import { ArrowLinkOffIcon } from 'components/Icons/ArrowLinkOffIcon';

export interface ExternalLinkProps {
  className?: string;
  link: string;
  text: string;
  withoutIcon?: boolean;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  className,
  link,
  text,
  withoutIcon
}) => {
  return (
    <a
      className={clsx(
        className,
        'ui-inline-flex ui-items-center ui-text-primary hover:ui-brightness-110 ui-transition ui-ease-out'
      )}
      href={link}
      rel="noreferrer noopener"
      target="_blank"
    >
      {text}
      {!withoutIcon && <ArrowLinkOffIcon />}
    </a>
  );
};
