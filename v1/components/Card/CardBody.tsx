import { FC } from 'react';
import styled from 'styled-components';
import { FlexDivCol } from '@snx-v1/styles';

export type CardBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardBody: FC<CardBodyProps> = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

const Container = styled(FlexDivCol)`
  position: relative;
  padding: 12px 18px;
`;
