import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function FilterIcon({ active, onClick }: SVGIconProps) {
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
				d="M7.5 8.5V4.5"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7.5 19.5V17.5"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16.5 15.5V19.5"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16.5 4.5V6.5"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="7.5"
				cy="14.5"
				r="3"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="16.5"
				cy="9.5"
				r="3"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
