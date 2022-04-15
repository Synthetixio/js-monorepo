import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function PrintIcon({ active, onClick }: SVGIconProps) {
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
				d="M7.5 7.5V4.5H16.5V7.5"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7.5 16.5H4.5V12.5C4.5 10.8431 5.84315 9.5 7.5 9.5H16.5C18.1569 9.5 19.5 10.8431 19.5 12.5V16.5H16.5"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="7.5"
				y="13.5"
				width="9"
				height="6"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
