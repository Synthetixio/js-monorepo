import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function ArrowTriangleLeftIcon({ active, onClick }: SVGIconProps) {
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
				d="M14.5 8.20711C14.5 7.76165 13.9614 7.53857 13.6464 7.85355L9.85355 11.6464C9.65829 11.8417 9.65829 12.1583 9.85355 12.3536L13.6464 16.1464C13.9614 16.4614 14.5 16.2383 14.5 15.7929V8.20711Z"
				fill={active ? colors.lightBlue : 'white'}
			/>
		</svg>
	);
}
