import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

interface TransactionCompletedProps extends IconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export const TransactionCompleted = ({
  width = '64px',
  height = '64px',
  color = '#47FAC2',
  ...props
}: TransactionCompletedProps) => {
  return (
    <Icon color={color} width={width} height={height} viewBox="0 0 64 64" fill="color" {...props}>
      <path
        d="M22.1668 31.6067L27.7268 37.1667L41.8468 23.0601L43.7268 24.9401L27.7268 40.9401L20.2734 33.4867L22.1668 31.6067Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32ZM61.3333 32C61.3333 48.2004 48.2004 61.3333 32 61.3333C15.7996 61.3333 2.66667 48.2004 2.66667 32C2.66667 15.7996 15.7996 2.66667 32 2.66667C48.2004 2.66667 61.3333 15.7996 61.3333 32Z"
        fill="currentColor"
      />
    </Icon>
  );
};
