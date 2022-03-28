import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';

interface LinkButtonProps {
	text: string;
	icon: JSX.Element;
	isExternalLink?: boolean;
	link: string;
}

export default function LinkButton({ text, icon, isExternalLink, link }: LinkButtonProps) {
	return (
		<StyledWrapper>
			<StyledButtonLinks
				href={link}
				target={!!isExternalLink ? '_blank' : undefined}
				rel={isExternalLink ? 'noreferrer noopener' : undefined}
			>
				<StyledButtonText>{text}</StyledButtonText>
				{icon}
			</StyledButtonLinks>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	display: inline-block;
	border: 1px solid rgba(130, 130, 149, 0.3);
	padding: 1px;
	border-radius: 30px;
`;

const StyledButtonLinks = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	outline: 0;
	background-color: transparent;
	padding: ${spacings.margin.tiny} ${spacings.margin.medium};
	border: 0;
	border-radius: 30px;
	cursor: pointer;
	background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
		linear-gradient(311.52deg, #3d464c -36.37%, #131619 62.81%);
	:active {
		text-decoration: none;
	}
`;

const StyledButtonText = styled.span`
	font-family: Inter;
	font-style: normal;
	font-weight: 500;
	font-size: 1rem;
	line-height: 15px;
	color: ${colors.white};
	margin-right: ${spacings.margin.tiny};
`;
