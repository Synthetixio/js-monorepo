import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';

interface LinkButtonProps {
	text: string;
	icon: JSX.Element;
	isExternalLink?: boolean;
	link: string;
	size?: keyof typeof spacings.margin;
}

export default function LinkButton({
	text,
	icon,
	isExternalLink,
	link,
	size,
	...rest
}: LinkButtonProps) {
	return (
		<StyledWrapper {...rest}>
			<StyledButtonLinks
				href={link}
				target={!!isExternalLink ? '_blank' : undefined}
				rel={isExternalLink ? 'noreferrer noopener' : undefined}
				size={size}
			>
				<StyledButtonText>{text}</StyledButtonText>
				{icon}
			</StyledButtonLinks>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	display: inline-block;
	padding: 2px;
	border-radius: 30px;
	background: ${colors.gradients.grey};
`;

const StyledButtonLinks = styled.a<{ size?: keyof typeof spacings.margin }>`
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
	outline: 0;
	background-color: transparent;
	padding: ${({ size }) => (size ? spacings.margin[size] : '10px')};
	border: 1px solid ${colors.black};
	border-radius: 30px;
	cursor: pointer;
	background: ${colors.gradients.grey};
`;

const StyledButtonText = styled.span`
	font-family: Inter;
	font-style: normal;
	font-weight: 500;
	font-size: 1rem;
	color: ${colors.white};
	margin-right: ${spacings.margin.tiny};
`;
