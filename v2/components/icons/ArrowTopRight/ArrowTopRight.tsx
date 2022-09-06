import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

interface ArrowTopRightProps extends IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const ArrowTopRight = ({
  width = 10,
  height = 12,
  color = '#00D1FF',
  ...props
}: ArrowTopRightProps) => {
  return (
    <Icon width={`${width}px`} height={`${height}px`} viewBox="0 0 8 9" {...props}>
      <path
        d="M6.28233 1.83246L2.48941 1.83246L2.48941 0.832615H7.98929V6.33249L6.98944 6.33249L6.98944 2.53957L1.02888 8.70711L0.321777 8L6.28233 1.83246Z"
        fill={color}
      />
    </Icon>
  );
};

<svg width="94" height="94" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>;
