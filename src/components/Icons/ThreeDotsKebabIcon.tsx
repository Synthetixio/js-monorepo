import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function ThreeDotsKebabIcon({ active, onClick }: SVGIconProps) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
		>
			<circle
				cx="12"
				cy="6"
				r="2"
				transform="rotate(90 12 6)"
				fill={active ? colors.lightBlue : 'white'}
			/>
			<circle
				cx="12"
				cy="12"
				r="2"
				transform="rotate(90 12 12)"
				fill={active ? colors.lightBlue : 'white'}
			/>
			<circle
				cx="12"
				cy="18"
				r="2"
				transform="rotate(90 12 18)"
				fill={active ? colors.lightBlue : 'white'}
			/>
		</svg>
	);
}
