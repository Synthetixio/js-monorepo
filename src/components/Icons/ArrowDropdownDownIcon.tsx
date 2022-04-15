import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function ArrowDropdownDownIcon({ active, onClick }: SVGIconProps) {
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
				d="M16 10L12 14L8 10"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
