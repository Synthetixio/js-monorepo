import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ModalProps {
	open: boolean;
}

export default function Modal({ open, children, ...rest }: PropsWithChildren<ModalProps>) {
	return (
		<StyledModalWrapper open={open} {...rest}>
			{children}
		</StyledModalWrapper>
	);
}

const StyledModalWrapper = styled.div<{ open: ModalProps['open'] }>`
	display: ${({ open }) => (open ? 'block' : 'none')};
	position: fixed;
	top: 10px;
	left: 10px;
	width: 100%;
	height: 100%;
`;
