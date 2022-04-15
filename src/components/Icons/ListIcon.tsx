import React from 'react';
import colors from '../../styles/colors';
import { SVGIconProps } from './types';

export default function ListIcon({ active, onClick }: SVGIconProps) {
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
				d="M15.6993 16.1734H8.64014"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15.6993 12.0807H8.64014"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M11.3338 7.99668H8.64014"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15.8872 3C15.8872 3 8.38121 3.00391 8.36947 3.00391C5.67094 3.02053 4 4.79609 4 7.5044V16.4956C4 19.2176 5.68365 21 8.40565 21C8.40565 21 15.9107 20.9971 15.9234 20.9971C18.6219 20.9804 20.2939 19.2039 20.2939 16.4956V7.5044C20.2939 4.7824 18.6092 3 15.8872 3Z"
				stroke={active ? colors.lightBlue : 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
