import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';

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
  border-radius: 5px;
  background: ${colors.gradients.rainbow};
  box-shadow: 0px 0px 5px ${colors.lightBlue.primary};
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.backgroundColor};
  border-radius: 4px;
`;
