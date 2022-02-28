import React from 'react';
import styled from 'styled-components';
import spacings from '../styles/spacings';
import colors from '../styles/colors';

interface IconButtonProps {
  icon: JSX.Element;
  active?: boolean;
}

export const IconButton = ({ icon, active, ...rest }: IconButtonProps) => {
  const StyledWrapper = styled.div`
    display: inline-block;
    border: 1px solid ${colors.grey};
    padding: 1px;
    border-radius: 4px;
  `;

  const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0;
    border-radius: 4px;
    background-color: transparent;
    padding: ${spacings.margin.small};
    border: 0;
    cursor: pointer;
    ${active &&
    'background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(311.52deg, #3d464c -36.37%, #131619 62.81%)'};
  `;

  return (
    <StyledWrapper {...rest}>
      <StyledButton>{icon}</StyledButton>
    </StyledWrapper>
  );
};
