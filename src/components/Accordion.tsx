import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

interface AccordionProps {
	isOpen?: boolean;
	headerChildren: React.ReactNode;
}

export default function Accordion({
	children,
	isOpen,
	headerChildren,
}: PropsWithChildren<AccordionProps>) {
	const [open, setOpen] = useState(isOpen);
	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);
	return (
		<StyledAccordionWrapper>
			<AccordionHeader onClick={() => setOpen(!open)}>{headerChildren}</AccordionHeader>
			{open && <AccordionContent visible={open}>{children}</AccordionContent>}
		</StyledAccordionWrapper>
	);
}

const StyledAccordionWrapper = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${colors.backgroundColor};
`;

const AccordionHeader = styled.div`
	cursor: pointer;
	width: 100%;
	height: 100%;
`;

const AccordionContent = styled.div<{ visible: boolean }>`
	width: 100%;
	height: 100%;
	animation: fade-in 300ms;

	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;
