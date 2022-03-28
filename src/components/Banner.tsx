import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';

interface BannerProps {
	color: keyof typeof colors.gradients;
}

export default function Banner({
	color = 'orange',
	children,
	...rest
}: PropsWithChildren<BannerProps>) {
	return (
		<StyledBannerWrapper {...rest} color={color}>
			<StyledBannerInner className="darker-40">{children}</StyledBannerInner>
		</StyledBannerWrapper>
	);
}

const StyledBannerWrapper = styled.div<{ color: BannerProps['color'] }>`
	width: 100%;
	border-radius: 5px;
	padding: 2px;
	background: ${({ color }) => colors.gradients[color]};
`;

const StyledBannerInner = styled.div`
	border-radius: inherit;
	padding: ${spacings.margin.medium};
`;
