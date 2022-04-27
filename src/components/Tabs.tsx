import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';

interface TabsProps extends HTMLAttributes<HTMLUListElement> {
	titles: string[];
	clicked: (index?: number) => void;
	size?: 'medium' | 'small';
	activeIndex?: number;
	justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-evenly' | 'space-around';
	icons?: JSX.Element[];
}

export default function Tabs({
	titles,
	clicked,
	activeIndex,
	justifyContent,
	size = 'medium',
	icons,
	...rest
}: TabsProps) {
	return (
		<StyledTabsWrapper justifyContent={justifyContent} {...rest}>
			{titles.map((title, index) => (
				<StyledTab
					key={title.concat(index.toString())}
					onClick={() => clicked(index)}
					active={activeIndex === index}
					size={size}
				>
					{title}
					{!!icons && (
						<StyledIconWrapper>{icons[index] ? icons[index] : icons[0]}</StyledIconWrapper>
					)}
				</StyledTab>
			))}
		</StyledTabsWrapper>
	);
}

const StyledTabsWrapper = styled.ul<{
	justifyContent?: TabsProps['justifyContent'];
}>`
	width: 100%;
	display: flex;
	justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'space-evenly')};
	padding: 5px;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 1.16rem;
`;

const StyledTab = styled.li<{ active?: boolean; size: TabsProps['size'] }>`
	display: flex;
	justify-content: center;
	align-items: center;
	list-style-type: none;
	padding: ${({ size }) => (size === 'medium' ? '8px 18px' : '2px 8px')};
	border-radius: 100px;
	background-color: ${({ active }) => active && colors.lightBlue};
	color: ${({ active }) => (active ? 'black' : colors.lightBlue)};
	cursor: pointer;
	font-family: Inter;
	font-style: normal;
	font-weight: bold;
	font-size: ${({ size }) => (size === 'medium' ? '1.16rem' : '1rem')};
	line-height: 20px;
	border: 1px solid transparent;
	:hover {
		border: 1px solid ${colors.lightBlue};
		transition: border-color 200ms linear;
	}
`;

const StyledIconWrapper = styled.span`
	margin-left: ${spacings.tiny};
	display: flex;
	justify-content: center;
	align-items: center;
`;
