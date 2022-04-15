import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function ArrowRightIcon({ active, onClick }: SVGIconProps) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
		>
			<path
				d="M14 8L18 12L14 16"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M18 12L7.6709 12"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
