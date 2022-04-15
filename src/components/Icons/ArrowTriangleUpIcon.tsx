import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function ArrowTriangleUpIcon({ active, onClick }: SVGIconProps) {
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
				d="M8.20711 14.5C7.76165 14.5 7.53857 13.9614 7.85355 13.6464L11.6464 9.85355C11.8417 9.65829 12.1583 9.65829 12.3536 9.85355L16.1464 13.6464C16.4614 13.9614 16.2383 14.5 15.7929 14.5H8.20711Z"
				fill={active ? colors.lightBlue : 'white'}
			/>
		</svg>
	);
}
