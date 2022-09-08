import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

interface TransactionPendingProps extends IconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export const TransactionPending = ({
  width = '64px',
  height = '64px',
  color = '#FFF458',
  ...props
}: TransactionPendingProps) => {
  return (
    <Icon color={color} width={width} height={height} viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M32 34a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="currentColor" />
      <path d="M44 36a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="currentColor" />
      <path d="M24 32a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 32c0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0c17.673 0 32 14.327 32 32Zm-2 0c0 16.569-13.431 30-30 30C15.431 62 2 48.569 2 32 2 15.431 15.431 2 32 2c16.569 0 30 13.431 30 30Z"
        fill="currentColor"
      />
    </Icon>
  );
};
