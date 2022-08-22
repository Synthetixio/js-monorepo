import Stake from '../../../components/accounts/Stake/index';
import StakingPositions from '../../../components/accounts/StakingPositions/index';
import { Box, Heading } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { StakingNav } from '../../../components/accounts/StakingNav';
import { useStakingPositions } from '../../../hooks/useStakingPositions';

export function AccountPosition() {
  const { id } = useParams();
  const accountId = Array.isArray(id) ? id[0] : id;

  const { stakingPositions } = useStakingPositions(accountId);

  return (
    <>
      <Helmet>
        <div>Account #{id}</div>
        <meta name="description" content="Account" />
      </Helmet>
      <Box>
        <StakingNav />
        <StakingPositions data={stakingPositions} />
        <Heading size="md" mb="3">
          Stake Collateralll
        </Heading>
        <Stake accountId={accountId} stakingPositions={stakingPositions} />
      </Box>
    </>
  );
}
