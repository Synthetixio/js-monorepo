import { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { FlexDivColCentered } from '@snx-v1/styles';
import { zIndex } from '@snx-v1/constantsUi';

import { Title } from './common';

type TxStateProps = {
  title: string;
  content: ReactNode;
  description?: ReactNode;
};

const TxState: FC<TxStateProps> = ({ description, title, content }) => (
  <Container>
    {description != null ? <Description>{description}</Description> : null}
    <InnerContainer>
      <Title>{title}</Title>
      {content}
    </InnerContainer>
  </Container>
);

const Container = styled.div`
  z-index: ${zIndex.DIALOG_OVERLAY};
  justify-content: space-around;
  height: 375px;
  background: ${(props) => props.theme.colors.navy};
  padding: 20px;
`;

const InnerContainer = styled(FlexDivColCentered)`
  margin: '20px 0 0 0';
  padding: '25px';
  background: ${(props) => props.theme.colors.black};
`;

const Description = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray};
`;

export default TxState;
