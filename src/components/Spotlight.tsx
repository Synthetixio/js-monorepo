import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

export default function Spotlight({ children, ...rest }: PropsWithChildren<{}>) {
	return (
		<StyledPinkSpotlight {...rest}>
			<StyledLightBlueSpotlight>{children}</StyledLightBlueSpotlight>
		</StyledPinkSpotlight>
	);
}

const StyledPinkSpotlight = styled.div`
	background-image: radial-gradient(
		farthest-side at 10% 20%,
		${colors.pink}${colors.hoverOpacity} 1%,
		transparent 50%
	);
`;

const StyledLightBlueSpotlight = styled.div`
	background-image: radial-gradient(
		farthest-side at 80% 99%,
		${colors.lightBlue}${colors.hoverOpacity} 1%,
		transparent 50%
	);
`;
