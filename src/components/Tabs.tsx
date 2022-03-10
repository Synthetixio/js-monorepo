import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';

interface TabsProps {
  titles: string[];
  onClick: (index: number) => void;
  size?: 'medium' | 'small';
  activeIndex?: number;
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-evenly'
    | 'space-around';
  icon?: JSX.Element;
}

export default function Tabs({
  titles,
  onClick,
  activeIndex,
  justifyContent,
  size = 'medium',
  icon,
}: TabsProps) {
  return (
    <StyledTabsWrapper justifyContent={justifyContent}>
      {titles.map((title, index) => (
        <StyledTab
          onClick={() => onClick(index)}
          active={activeIndex === index}
          size={size}
        >
          {title}
          {icon && <StyledIconWrapper>{icon}</StyledIconWrapper>}
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
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'space-evenly'};
  padding: 5px;
`;

const StyledTab = styled.li<{ active?: boolean; size: TabsProps['size'] }>`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  padding: ${({ size }) => (size === 'medium' ? '8px 18px' : '2px 8px')};
  border-radius: 100px;
  background-color: ${({ active }) => active && colors.lightBlue.primary};
  color: ${({ active }) => (active ? 'black' : colors.lightBlue.primary)};
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: ${({ size }) => (size === 'medium' ? '1.16rem' : '1rem')};
  line-height: 20px;
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${colors.lightBlue.primary};
    transition: border-color 200ms linear;
  }
`;

const StyledIconWrapper = styled.span`
  margin-left: ${spacings.margin.tiny};
  display: flex;
  justify-content: center;
  align-items: center;
`;
