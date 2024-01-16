import React from 'react';
import styled from 'styled-components';

import ActionBox from './ActionBox';

const Index: React.FC = () => {
  return (
    <Container>
      <ActionBox />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 650px;
`;

export default Index;
