import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

interface CardProps {
  withGradientWrapper?: boolean;
}

export default function Card({
  withGradientWrapper,
  children,
}: PropsWithChildren<CardProps>) {
  if (withGradientWrapper) {
    return (
      <StyledGradientWrapper>
        <StyledCard>{children}</StyledCard>
      </StyledGradientWrapper>
    );
  }
  return <StyledCard>{children}</StyledCard>;
}

const StyledGradientWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: ${colors.gradients.rainbow};
  padding: 2px;
  border-radius: 4px;
`;

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.backgroundColor};
  border-radius: 4px;
`;
