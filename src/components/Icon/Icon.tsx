import clsx from 'clsx';

export interface IconProps {
  name: SynthetixIcon;
  className?: string;
  cursorPointer?: boolean;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  name,
  cursorPointer = false,
  className = 'text-lg',
  onClick
}) => {
  return (
    <i
      aria-hidden='true'
      className={clsx(
        `synthetix-${name}`,
        {
          'ui-cursor-pointer': cursorPointer || !!onClick
        },
        className
      )}
      onClick={onClick}
    />
  );
};

export type SynthetixIcon =
  | 'Archive'
  | 'Bell'
  | 'Bin'
  | 'Bottom-2'
  | 'Bottom-3'
  | 'Bottom'
  | 'Burger-indent'
  | 'Burger'
  | 'Burn'
  | 'Caution'
  | 'Chart'
  | 'Clock'
  | 'Collapse'
  | 'Comment'
  | 'Copy'
  | 'Dashboard'
  | 'Earn'
  | 'Edit'
  | 'Exit'
  | 'Expand'
  | 'Filter'
  | 'Governance'
  | 'Grid'
  | 'Heart'
  | 'Horizontal'
  | 'Image'
  | 'Left-2'
  | 'Left-3'
  | 'Left-4'
  | 'Left'
  | 'Link-off'
  | 'List'
  | 'Megaphone'
  | 'Mint'
  | 'Minus'
  | 'Open-in-new'
  | 'Plus'
  | 'Right-2'
  | 'Right-3'
  | 'Right-4'
  | 'Right'
  | 'rocket'
  | 'Search'
  | 'Settings'
  | 'Small-Cross'
  | 'Small-Plus'
  | 'Sort'
  | 'Stake'
  | 'Switch'
  | 'Tick'
  | 'Top-2'
  | 'Top-3'
  | 'Top'
  | 'Vertical'
  | 'Vote'
  | 'Wallet';
