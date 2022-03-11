import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';

interface SelectorProps {
  text: string;
  icon?: JSX.Element;
  onClick: () => void;
}

export default function Selector({ text, icon, onClick }: SelectorProps) {
  return (
    <SelectorWrapper onClick={onClick}>
      <SelectorText>{text}</SelectorText> {icon}
    </SelectorWrapper>
  );
}

const SelectorWrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  background-color: ${colors.backgroundColor};
  border: 0;
  outline: 0;
`;

const SelectorText = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 140%;
  color: ${colors.lightBlue.primary};
  margin-right: ${spacings.margin.big};
`;
