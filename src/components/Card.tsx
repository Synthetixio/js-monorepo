import React, { HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Colors } from '../types';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	color?: Colors;
	gradient?: keyof typeof colors.gradients;
	withGlow?: boolean;
}

export default function Card({
	color,
	gradient,
	withGlow,
	children,
	...rest
}: PropsWithChildren<CardProps>) {
	return (
		<StyledCard color={color} gradient={gradient} withGlow={!!withGlow} {...rest}>
			{children}
		</StyledCard>
	);
}

const StyledCard = styled.div<CardProps>`
	width: 100%;
	height: 100%;
	background: ${({ gradient }) => (gradient ? colors.gradients[gradient] : colors.backgroundColor)};
	box-shadow: ${({ withGlow, color }) => withGlow && color && `0 0 10px ${colors[color]}`};
	${({ color }) => color && `border: 2px solid ${colors[color]};`};
	border-radius: 4px;
	background-color: ${({ color }) => color && colors[color]};
`;
