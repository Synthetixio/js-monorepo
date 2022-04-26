import React, { HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Colors } from '../types';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	withBorderColor?: {
		color?: Colors;
		gradient?: keyof typeof colors.gradients;
		withGlow?: boolean;
	};
	withBackgroundColor?: Colors;
}

export default function Card({
	withBorderColor,
	withBackgroundColor,
	children,
	...rest
}: PropsWithChildren<CardProps>) {
	if (withBorderColor) {
		return (
			<StyledGradientWrapper
				withBorderGradient={withBorderColor.gradient}
				withBorderColor={withBorderColor.color}
				withGlow={!!withBorderColor.withGlow}
				{...rest}
			>
				<StyledCard>{children}</StyledCard>
			</StyledGradientWrapper>
		);
	}
	if (withBackgroundColor) {
		return (
			<StyledBackgroundWrapper backgroundColor={withBackgroundColor} {...rest}>
				<StyledCard className="darker-40" isWithBackground={!!withBackgroundColor}>
					{children}
				</StyledCard>
			</StyledBackgroundWrapper>
		);
	}
	return <StyledCard>{children}</StyledCard>;
}

const StyledGradientWrapper = styled.div<{
	withBorderColor?: Colors;
	withGlow?: boolean;
	withBorderGradient?: keyof typeof colors.gradients;
}>`
	width: 100%;
	height: 100%;
	background: ${({ withBorderColor, withBorderGradient }) =>
		withBorderColor ? withBorderColor : withBorderGradient && colors.gradients[withBorderGradient]};
	box-shadow: ${({ withBorderColor, withGlow }) => withGlow && `0 0 10px ${withBorderColor}`};
	padding: 1px;
	border-radius: 4px;
`;

const StyledBackgroundWrapper = styled.div<{ backgroundColor: Colors }>`
	width: 100%;
	height: 100%;
	border-radius: 5px;
	background: ${({ backgroundColor }) => colors[backgroundColor]};
	padding: 1px;
	border-radius: 4px;
`;

const StyledCard = styled.div<{ isWithBackground?: boolean }>`
	width: 100%;
	height: 100%;
	background-color: ${({ isWithBackground }) => !isWithBackground && colors.backgroundColor};
	border-radius: 4px;
`;
