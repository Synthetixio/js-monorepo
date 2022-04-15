import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function ArrowTriangleRightIcon({ active, onClick }: SVGIconProps) {
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
				d="M9.5 15.7929C9.5 16.2383 10.0386 16.4614 10.3536 16.1464L14.1464 12.3536C14.3417 12.1583 14.3417 11.8417 14.1464 11.6464L10.3536 7.85355C10.0386 7.53857 9.5 7.76165 9.5 8.20711V15.7929Z"
				fill={active ? colors.lightBlue : 'white'}
			/>
		</svg>
	);
}
