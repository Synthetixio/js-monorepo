import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';
import Flex from './Flex';
import ArrowLeftIcon from './Icons/ArrowLeftIcon';
import ArrowRightIcon from './Icons/ArrowRightIcon';

interface ButtonCardsProps extends HTMLAttributes<HTMLButtonElement> {
	onClick?: () => void;
	arrowDirection: 'left' | 'right';
	headline: string;
	subline?: string;
	icon?: JSX.Element;
	sublineFirst?: boolean;
}

export default function ButtonCards({
	arrowDirection = 'right',
	onClick,
	headline,
	subline,
	icon,
	sublineFirst,
	...rest
}: ButtonCardsProps) {
	return (
		<StyledButton {...rest} onClick={onClick}>
			<StyledWrapper
				direction="column"
				alignItems={arrowDirection === 'left' ? 'flex-end' : 'flex-start'}
				justifyContent="flex-start"
			>
				{sublineFirst ? (
					<>
						<StyledSubline direction={arrowDirection}>{subline}</StyledSubline>
						<StyledHeadline direction={arrowDirection}>{headline}</StyledHeadline>
					</>
				) : (
					<>
						<StyledHeadline direction={arrowDirection}>{headline}</StyledHeadline>
						<StyledSubline direction={arrowDirection}>{subline}</StyledSubline>
					</>
				)}
				<StyledArrowWrapperIcon direction={arrowDirection}>
					{arrowDirection === 'left' ? (
						icon ? (
							icon
						) : (
							<ArrowLeftIcon active={true} />
						)
					) : icon ? (
						icon
					) : (
						<ArrowRightIcon active={true} />
					)}
				</StyledArrowWrapperIcon>
			</StyledWrapper>
		</StyledButton>
	);
}

const StyledButton = styled.button`
	border: 0px;
	outline: 0px;
	padding: 1px;
	background: ${colors.gradients.rainbow};
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
	border-radius: 4px;
	cursor: pointer;
	width: 100%;
`;

const StyledWrapper = styled(Flex)`
	background-color: ${colors.backgroundColor};
	border-radius: 4px;
	padding: 16px;
	width: 100%;
	height: 100%;
	position: relative;
`;

const StyledHeadline = styled.h3<{ direction: ButtonCardsProps['arrowDirection'] }>`
	font-family: 'Inter Bold';
	font-size: 1.5rem;
	color: ${colors.white};
	text-align: ${({ direction }) => (direction === 'left' ? 'right' : 'left')};
	width: 100%;
	margin: ${spacings.tiniest} 0;
`;

const StyledSubline = styled.span<{ direction: ButtonCardsProps['arrowDirection'] }>`
	font-family: 'Inter';
	font-size: 1rem;
	color: ${colors.grey};
	text-align: ${({ direction }) => (direction === 'left' ? 'right' : 'left')};
	width: 100%;
`;

const StyledArrowWrapperIcon = styled.div<{ direction: ButtonCardsProps['arrowDirection'] }>`
	position: absolute;
	top: 20px;
	${({ direction }) => `${direction}: 30px`}
`;
