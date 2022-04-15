import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function TrashIcon({ active, onClick }: SVGIconProps) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
		>
			<rect
				x="4.5"
				y="5.5"
				width="15"
				height="3"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M17.5 10.5V18.5H6.5V10.5"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="9.5"
				y="11.5"
				width="5"
				height="3"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
