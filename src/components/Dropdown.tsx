import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

interface DropdownProps {
  elements: JSX.Element[];
  noBackground?: boolean;
}

export default function Dropdown({ elements, noBackground }: DropdownProps) {
  return (
    <StyledUnorderedList noBackground={noBackground}>
      {elements.map((element, index) => (
        <StyledListElement
          isEven={index % 2 === 0}
          key={index}
          noBackground={noBackground}
        >
          {element}
        </StyledListElement>
      ))}
    </StyledUnorderedList>
  );
}

const StyledUnorderedList = styled.ul<{
  noBackground?: DropdownProps['noBackground'];
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ noBackground }) =>
    !noBackground && colors.backgroundColor};
  padding: 0;
  border-radius: 8px;
`;

const StyledListElement = styled.li<{
  isEven: boolean;
  noBackground?: DropdownProps['noBackground'];
}>`
  width: 100%;
  list-style-type: none;
  background-color: ${({ isEven, noBackground }) =>
    isEven && !noBackground && 'rgba(0,0,0,0.2)'};
  cursor: pointer;
  :hover {
    background-color: ${colors.black};
  }
  :active {
    background-color: ${colors.black};
  }
`;
