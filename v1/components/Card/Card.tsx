import { FC } from 'react';
import styled from 'styled-components';

import { CardHeader, CardHeaderProps } from './CardHeader';
import { CardBody, CardBodyProps } from './CardBody';

type CardProps = {
  children: React.ReactNode;
  isRounded?: boolean;
  className?: string;
};

type StaticComponents = {
  Header: FC<CardHeaderProps>;
  Body: FC<CardBodyProps>;
};

// @ts-ignore
export const Card: FC<CardProps> & StaticComponents = ({ children, isRounded, ...rest }) => (
  <Container isRounded={isRounded} {...rest}>
    {children}
  </Container>
);

Card.Header = CardHeader;
Card.Body = CardBody;

const Container = styled.div<{ isRounded?: boolean }>`
  background-color: ${(props) => props.theme.colors.black};
  display: flex;
  flex-direction: column;
  border-radius: ${(props) => (props.isRounded ? '100px' : '4px')};
`;
