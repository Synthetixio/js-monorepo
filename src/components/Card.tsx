import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Colors } from '../types';

interface CardProps {
	withBorderGradient?: boolean;
	withBackgroundGradientColor?: Colors;
}

export default function Card({
	withBorderGradient,
	withBackgroundGradientColor,
	children,
}: PropsWithChildren<CardProps>) {
	if (withBorderGradient) {
		return (
			<StyledGradientWrapper>
				<StyledCard>{children}</StyledCard>
			</StyledGradientWrapper>
		);
	}
	if (withBackgroundGradientColor) {
		return (
			<StyledBackgroundGradientWrapper color={withBackgroundGradientColor}>
				<StyledCard className="darker-40">{children}</StyledCard>
			</StyledBackgroundGradientWrapper>
		);
	}
	return <StyledCard>{children}</StyledCard>;
}

const StyledGradientWrapper = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 5px;
	background: ${colors.gradients.rainbow};
	padding: 2px;
	border-radius: 4px;
`;

const StyledBackgroundGradientWrapper = styled.div<{ color: Colors }>`
	width: 100%;
	height: 100%;
	border-radius: 5px;
	background: ${({ color }) => colors[color]};
	padding: 2px;
	border-radius: 4px;
`;

const StyledCard = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${colors.backgroundColor};
	border-radius: 4px;
`;
