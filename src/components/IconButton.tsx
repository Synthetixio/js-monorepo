import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import spacings from '../styles/spacings';
import theme from '../styles/theme';

interface IconWrapperProps {
	rounded?: boolean;
	size?: keyof typeof spacings.margin;
	active?: boolean;
}

export default function IconWrapper({
	rounded,
	size,
	children,
	active,
	...rest
}: PropsWithChildren<IconWrapperProps>) {
	return (
		<StyledWrapper rounded={rounded} active={active} {...rest}>
			<StyledGradient rounded={rounded} size={size} active={active}>
				{children}
			</StyledGradient>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div<{
	rounded?: IconWrapperProps['rounded'];
	active?: IconWrapperProps['active'];
}>`
	display: inline-block;
	padding: 2px;
	border-radius: ${({ rounded }) => (rounded ? '30px' : '4px')};
	${({ active }) =>
		active &&
		`background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(311.52deg, #3d464c -36.37%, #131619 62.81%);`}
`;

const StyledGradient = styled.div<{
	rounded?: IconWrapperProps['rounded'];
	size?: IconWrapperProps['size'];
	active?: IconWrapperProps['active'];
}>`
	display: flex;
	justify-content: center;
	align-items: center;
	outline: 0;
	background-color: ${theme.colors.black};
	padding: ${({ size }) => size && spacings.margin[size]};
	border: 1px solid ${theme.colors.black};
	border-radius: ${({ rounded }) => (rounded ? '30px' : '4px')};
	cursor: pointer;
	${({ active }) =>
		active &&
		`background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(311.52deg, #3d464c -36.37%, #131619 62.81%);`}
`;
