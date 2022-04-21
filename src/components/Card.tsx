import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Colors } from '../types';

interface CardProps {
	withBorderColor?: { color: Colors; withGlow: boolean };
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
			<StyledBackgroundWrapper color={withBackgroundColor} {...rest}>
				<StyledCard className="darker-40" isWithBackground={!!withBackgroundColor}>
					{children}
				</StyledCard>
			</StyledBackgroundWrapper>
		);
	}
	return <StyledCard>{children}</StyledCard>;
}

const StyledGradientWrapper = styled.div<{ withBorderColor?: Colors; withGlow: boolean }>`
	width: 100%;
	height: 100%;
	border-radius: 5px;
	background: ${({ withBorderColor }) => withBorderColor};
	box-shadow: ${({ withBorderColor, withGlow }) => withGlow && `0 0 10px ${withBorderColor}`};
	padding: 2px;
	border-radius: 4px;
`;

const StyledBackgroundWrapper = styled.div<{ color: Colors }>`
	width: 100%;
	height: 100%;
	border-radius: 5px;
	background: ${({ color }) => colors[color]};
	padding: 2px;
	border-radius: 4px;
`;

const StyledCard = styled.div<{ isWithBackground?: boolean }>`
	width: 100%;
	height: 100%;
	background-color: ${({ isWithBackground }) => !isWithBackground && colors.backgroundColor};
	border-radius: 4px;
`;
