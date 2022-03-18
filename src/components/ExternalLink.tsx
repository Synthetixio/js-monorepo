import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import ArrowLinkOffIcon from './Icons/ArrowLinkOffIcon';

interface ExternalLinkProps {
	link: string;
	text: string;
	withoutIcon?: boolean;
	customColor?: { textColor?: string; hoverColor?: string };
}

export default function ExternalLink({
	link,
	text,
	withoutIcon = false,
	customColor = {},
	...rest
}: ExternalLinkProps) {
	return (
		<StyledWrapper {...rest}>
			<StyledExternalLink href={link} customColor={customColor}>
				{text}
			</StyledExternalLink>
			{!withoutIcon && <ArrowLinkOffIcon active={true} />}
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const StyledExternalLink = styled.a.attrs({
	target: '_blank',
	rel: 'noreferrer noopener',
})<{ customColor?: ExternalLinkProps['customColor'] }>`
	text-decoration: none;
	color: ${({ customColor }) =>
		customColor?.textColor ? customColor.textColor : colors.lightBlue.primary};
	font-family: Inter;

	:hover {
		color: ${({ customColor }) =>
			customColor?.hoverColor ? customColor.hoverColor : colors.lightBlue.dark.darker20};
	}
`;
