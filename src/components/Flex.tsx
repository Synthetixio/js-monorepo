import React, { HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
	direction?: 'column';
	justifyContent?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-evenly'
		| 'space-around'
		| 'space-between';
	alignItems?: 'flex-start' | 'flex-end' | 'center' | 'space-evenly' | 'space-around' | 'baseline';
	wrap?: boolean;
}

export default function Flex({
	direction,
	justifyContent,
	alignItems,
	wrap,
	children,
	...rest
}: PropsWithChildren<FlexProps>) {
	return (
		<StyledFlex
			{...rest}
			direction={direction}
			justifyContent={justifyContent}
			alignItems={alignItems}
			wrap={wrap}
		>
			{children}
		</StyledFlex>
	);
}

const StyledFlex = styled.div<FlexProps>`
	display: flex;
	${({ direction }) => direction && `flex-direction: ${direction}`};
	${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
	${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
	${({ wrap }) => wrap && 'flex-wrap: wrap'}
`;
