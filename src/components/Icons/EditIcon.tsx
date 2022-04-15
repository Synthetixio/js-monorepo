import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function EditIcon({ active, onClick }: SVGIconProps) {
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
				d="M17 11L13 7"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.5 18.5L4.5 19.5L5.5 14.5L15.5 4.5L19.5 8.5L9.5 18.5V18.5Z"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
