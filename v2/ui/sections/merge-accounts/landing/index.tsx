import { FC, useMemo } from 'react';
import styled from 'styled-components';

import media from '@snx-v1/media';
import useStakingCalculations from 'sections/staking/hooks/useStakingCalculations';

import { Col, Cols as BaseCols } from 'sections/merge-accounts/common';
import GridBox from './GridBox';
import Connector from 'containers/Connector';
import { Flex } from '@chakra-ui/react';

const Index: FC = () => {
  const { isAppReady } = Connector.useContainer();
  const { debtBalance, isLoading } = useStakingCalculations();
  const hasDebt = useMemo(() => debtBalance.gt(0), [debtBalance]);
  return !(isAppReady && !isLoading) ? null : (
    <Flex flexDir="column">
      <Cols>
        <Col>
          <GridBox step={1} name={hasDebt ? 'burn' : 'nominate'} />
        </Col>
        <Col>
          <GridBox step={2} name="merge" />
        </Col>
      </Cols>
    </Flex>
  );
};

const Cols = styled(BaseCols)`
  ${media.greaterThan('mdUp')`
    grid-template-columns: 1fr 1fr;
  `}
`;

export default Index;
