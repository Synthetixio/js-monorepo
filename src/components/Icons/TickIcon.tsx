import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function TickIcon({ active, onClick }: SVGIconProps) {
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
				d="M8.59 15.58L4.42 11.41L3 12.82L8.59 18.41L20.59 6.41L19.18 5L8.59 15.58Z"
				fill={active ? colors.lightBlue : 'white'}
			/>
		</svg>
	);
}
