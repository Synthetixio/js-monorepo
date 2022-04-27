import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import ArrowLinkOffIcon from './Icons/ArrowLinkOffIcon';

interface ExternalLinkProps extends HTMLAttributes<HTMLDivElement> {
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
				<div className="darker-20">{text}</div>
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
		customColor?.textColor ? customColor.textColor : colors.lightBlue};
	font-family: Inter;

	:hover {
		${({ customColor }) =>
			customColor?.hoverColor ? `color: ${customColor.hoverColor}` : 'filter: brightness(80%)'};
	}
`;
