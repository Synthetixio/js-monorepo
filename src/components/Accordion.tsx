import React, { HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '..';
import colors from '../styles/colors';
import ArrowDropdownDownIcon from './Icons/ArrowDropdownDownIcon';
import ArrowDropdownUpIcon from './Icons/ArrowDropdownUpIcon';

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
	isOpen?: boolean;
	headerChildren: React.ReactNode;
	gradient?: keyof typeof colors.gradients;
}

export default function Accordion({
	children,
	isOpen,
	gradient = 'grey',
	headerChildren,
	...rest
}: PropsWithChildren<AccordionProps>) {
	const [open, setOpen] = useState(isOpen);
	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);
	return (
		<StyledGradientWrapper onClick={() => setOpen(!open)} gradient={gradient} {...rest}>
			<StyledAccordionWrapper>
				<AccordionHeader>
					{headerChildren}
					<StyledIconWrapper>
						{open ? (
							<IconButton rounded onClick={() => setOpen(!open)} size="tiniest" active={true}>
								<ArrowDropdownUpIcon active={true} />
							</IconButton>
						) : (
							<IconButton rounded onClick={() => setOpen(!open)} size="tiniest" active={true}>
								<ArrowDropdownDownIcon active={true} />
							</IconButton>
						)}
					</StyledIconWrapper>
				</AccordionHeader>
				{open && <AccordionContent visible={open}>{children}</AccordionContent>}
			</StyledAccordionWrapper>
		</StyledGradientWrapper>
	);
}

const StyledGradientWrapper = styled.div<{ gradient?: keyof typeof colors.gradients }>`
	background: ${({ gradient }) => gradient && colors.gradients[gradient]};
	padding: 1px;
	border-radius: 5px;
	width: 100%;
	height: 100%;
	box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
	cursor: pointer;
`;

const StyledAccordionWrapper = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${colors.backgroundColor};
	box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
	border-radius: 5px;
	padding: 20px 24px;
`;

const AccordionHeader = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;

const AccordionContent = styled.div<{ visible: boolean }>`
	width: 100%;
	height: 100%;
	animation: fade-in 300ms;
	padding-top: 20px;

	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;

const StyledIconWrapper = styled.div`
	margin-left: auto;
	position: absolute;
	right: 0px;
	top: 50%;
	transform: translate(0, -50%);
`;
