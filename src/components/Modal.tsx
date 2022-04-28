import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ModalProps {
	open: boolean;
	modalContent?: JSX.Element;
}

export default function Modal({
	open,
	modalContent,
	children,
	...rest
}: PropsWithChildren<ModalProps>) {
	return (
		<StyledModalWrapper {...rest}>
			{open && modalContent && (
				<StyledModalContentWrapper>{modalContent}</StyledModalContentWrapper>
			)}
			{children}
		</StyledModalWrapper>
	);
}

const StyledModalWrapper = styled.div`
	position: relative;
`;

const StyledModalContentWrapper = styled.div`
	position: absolute;
	z-index: 999;
	top: 10px;
	left: 10px;
	width: calc(99% - 10px);
	height: calc(99% - 10px);
`;
