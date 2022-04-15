import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function ArrowTriangleDownIcon({ active, onClick }: SVGIconProps) {
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
				d="M8.20711 9.5C7.76165 9.5 7.53857 10.0386 7.85355 10.3536L11.6464 14.1464C11.8417 14.3417 12.1583 14.3417 12.3536 14.1464L16.1464 10.3536C16.4614 10.0386 16.2383 9.5 15.7929 9.5H8.20711Z"
				fill={active ? colors.lightBlue : 'white'}
			/>
		</svg>
	);
}
