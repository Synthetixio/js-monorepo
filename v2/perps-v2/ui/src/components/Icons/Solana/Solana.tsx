import { Icon, IconProps } from '@chakra-ui/react';

export const Solana = ({ width = '300px', height = '300px' }: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 300 300" fill="none">
      <path
        d="M150 300C232.843 300 300 232.843 300 150C300 67.1573 232.843 0 150 0C67.1573 0 0 67.1573 0 150C0 232.843 67.1573 300 150 300Z"
        fill="white"
      />
    </Icon>
  );
};
