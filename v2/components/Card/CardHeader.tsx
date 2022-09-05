import { FC } from 'react';
import styled from 'styled-components';

import { FlexDivCentered } from '@snx-v2/styles';

export type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardHeader: FC<CardHeaderProps> = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

const Container = styled(FlexDivCentered)`
  position: relative;
  color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.grayBlue};
  height: 32px;
  padding: 0 18px;
  justify-content: flex-start;
  text-transform: capitalize;
  font-family: ${(props) => props.theme.fonts.interBold};
  font-size: 12px;
  flex-shrink: 0;
`;
