import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Colors } from '../types';

interface DropdownProps extends HTMLAttributes<HTMLUListElement> {
	elements: JSX.Element[];
	color: Colors;
}

export default function Dropdown({ elements, color, ...rest }: DropdownProps) {
	return (
		<StyledUnorderedList color={color} {...rest}>
			{elements.map((element) => (
				<StyledListElement className="darker-60" key={element.key}>
					{element}
				</StyledListElement>
			))}
		</StyledUnorderedList>
	);
}

const StyledUnorderedList = styled.ul<{
	color: DropdownProps['color'];
}>`
	display: flex;
	flex-direction: column;
	width: 100%;
	border: 1px solid ${({ color }) => colors[color]};
	background-color: ${({ color }) => colors[color]};
	padding: 0;
	border-radius: 8px;
`;

const StyledListElement = styled.li<{}>`
	width: 100%;
	list-style-type: none;
	border-radius: 8px;
	cursor: pointer;
	:not(:first-child):not(:last-child) {
		border-radius: 0px;
	}
	:first-child {
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
	}
	:last-child {
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
	}

	:hover {
		background-color: transparent;
	}
	:active {
		background-color: transparent;
	}
`;
