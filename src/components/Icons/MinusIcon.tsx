import colors from '../../styles/colors';
import React from 'react';
import { SVGIconProps } from './types';

export default function MinusIcon({ active }: SVGIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 12H7"
        stroke={active ? colors.lightBlue.primary : 'white'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
