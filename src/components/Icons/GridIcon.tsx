import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function GridIcon({ active, onClick }: SVGIconProps) {
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
				d="M5.5 12.5H19.5"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12.5 5.5V19.5"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18.5 19.5H6.5C5.948 19.5 5.5 19.052 5.5 18.5V6.5C5.5 5.948 5.948 5.5 6.5 5.5H18.5C19.052 5.5 19.5 5.948 19.5 6.5V18.5C19.5 19.052 19.052 19.5 18.5 19.5Z"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
