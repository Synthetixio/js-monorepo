import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

interface DropdownProps {
  elements: JSX.Element[];
  parent: JSX.Element;
}

export default function Dropdown({ elements }: DropdownProps) {
  return (
    <StyledUnorderedList>
      {elements.map((element, index) => (
        <StyledListElement isEven={index % 2 === 0} key={index}>
          {element}
        </StyledListElement>
      ))}
    </StyledUnorderedList>
  );
}

const StyledUnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.backgroundColor};
  padding: 0;
`;

const StyledListElement = styled.li<{ isEven: boolean }>`
  width: 100%;
  list-style-type: none;
  background-color: ${({ isEven }) => isEven && 'rgba(0,0,0,0.2)'};
  cursor: pointer;
  :hover {
    background-color: ${colors.black};
  }
  :active {
    background-color: ${colors.black};
  }
`;
