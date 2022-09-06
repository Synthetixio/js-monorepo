import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const KebabMenuVertical = ({
  width = '20px',
  height = '20px',
  color = 'white',
  ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 20 20" fill="none" color={color} {...props}>
      <path
        d="M10.0002 13.3334C10.9206 13.3334 11.6668 14.0796 11.6668 15.0001C11.6668 15.9206 10.9206 16.6667 10.0002 16.6667C9.07969 16.6667 8.3335 15.9206 8.3335 15.0001C8.3335 14.0796 9.07969 13.3334 10.0002 13.3334Z"
        fill="currentColor"
      />
      <path
        d="M10.0002 8.33341C10.9206 8.33341 11.6668 9.07961 11.6668 10.0001C11.6668 10.9206 10.9206 11.6667 10.0002 11.6667C9.07969 11.6667 8.3335 10.9206 8.3335 10.0001C8.3335 9.07961 9.07969 8.33341 10.0002 8.33341Z"
        fill="currentColor"
      />
      <path
        d="M11.6668 5.00008C11.6668 4.07961 10.9206 3.33341 10.0002 3.33341C9.07969 3.33341 8.3335 4.07961 8.3335 5.00008C8.3335 5.92056 9.07969 6.66675 10.0002 6.66675C10.9206 6.66675 11.6668 5.92056 11.6668 5.00008Z"
        fill="currentColor"
      />
    </Icon>
  );
};
