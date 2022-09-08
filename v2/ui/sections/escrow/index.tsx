import { useMemo } from 'react';
import styled from 'styled-components';

import { FlexDivCol } from '@snx-v1/styles';
import media from '@snx-v1/media';

import ActionBox from './components/ActionBox';
import EscrowTable from './components/EscrowTable';
import { useLocation } from 'react-router-dom';
import { EscrowPanelType } from 'store/escrow';

const Index: React.FC = () => {
  const { search } = useLocation();
  const defaultTab = useMemo(() => {
    const action = new URLSearchParams(search).get('action');
    return action ?? EscrowPanelType.REWARDS;
  }, [search]);

  return (
    <Container>
      <Col>
        <ActionBox currentTab={defaultTab} />
      </Col>
      <Col>
        <EscrowTable />
      </Col>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  ${media.lessThan('mdUp')`
    display: flex;
    flex-direction: column;
  `}
`;

const Col = styled(FlexDivCol)``;

export default Index;
