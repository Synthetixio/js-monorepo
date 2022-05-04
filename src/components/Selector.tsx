import React, { HTMLAttributes, MouseEvent } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';

interface SelectorProps extends HTMLAttributes<HTMLButtonElement> {
	text: string;
	icon?: JSX.Element;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Selector({ text, icon, onClick, ...rest }: SelectorProps) {
	return (
		<SelectorWrapper onClick={onClick} hasIcon={!!icon} {...rest}>
			<SelectorText hasIcon={!!icon}>{text}</SelectorText> {icon}
		</SelectorWrapper>
	);
}

const SelectorWrapper = styled.button<{ hasIcon: boolean }>`
	display: flex;
	flex-direction: row;
	justify-content: ${({ hasIcon }) => (hasIcon ? 'space-between' : 'center')};
	align-items: center;
	padding: 6px 8px;
	background-color: ${colors.backgroundColor};
	border: 0;
	outline: 0;
	cursor: pointer;
	min-height: 38px;

	:hover {
		background-color: ${colors.backgroundColor.concat(colors.hoverOpacity)};
		transition: background-color 200ms ease-in;
	}
	:active {
		background-color: ${colors.backgroundColor.concat(colors.hoverOpacity)};
		transition: background-color 200ms ease-in;
	}
`;

const SelectorText = styled.span<{ hasIcon: boolean }>`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 1rem;
	line-height: 140%;
	color: ${colors.lightBlue};
	${({ hasIcon }) => {
		return hasIcon ? `margin-right: ${spacings.big};` : `margin: 0 ${spacings.biggest};`;
	}}
`;
