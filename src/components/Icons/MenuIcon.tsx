import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function MenuIcon({ active, onClick }: SVGIconProps) {
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
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3 8V6H21V8H3ZM3 13H21V11H3V13ZM3 18H21V16H3V18Z"
				fill={active ? colors.lightBlue : 'white'}
			/>
		</svg>
	);
}
