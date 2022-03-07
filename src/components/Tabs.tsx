import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

interface TabsProps {
  titles: string[];
  onClick: (index: number) => void;
  activeIndex?: number;
}

export default function Tabs({ titles, onClick, activeIndex }: TabsProps) {
  return (
    <StyledTabsWrapper>
      {titles.map((title, index) => (
        <StyledTab
          onClick={() => onClick(index)}
          active={activeIndex === index}
        >
          {title}
        </StyledTab>
      ))}
    </StyledTabsWrapper>
  );
}

const StyledTabsWrapper = styled.ul`
  width: 100%;
  display: flex;
`;

const StyledTab = styled.li<{ active?: boolean }>`
  list-style-type: none;
  padding: 8px 18px;
  border-radius: 100px;
  background-color: ${({ active }) => active && colors.lightBlue.primary};
  color: ${({ active }) => (active ? 'black' : colors.lightBlue.primary)};
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 1.16rem;
  line-height: 20px;
`;
