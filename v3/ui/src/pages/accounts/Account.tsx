import { Box, Container, Heading } from '@chakra-ui/react';
import { useStakingPositions } from '../../hooks/useStakingPositions';
import { useParams } from 'react-router-dom';
import Stake from '../../components/accounts/Stake';
import { StakingNav } from '../../components/accounts/StakingNav';
import StakingPositions from '../../components/accounts/StakingPositions';

export function Account() {
  const { id } = useParams();
  const accountId = Array.isArray(id) ? id[0] : id;

  const { stakingPositions } = useStakingPositions(accountId);

  // const accountModule = useContract(contracts.ACCOUNT_MODULE);

  // const { data, error, isLoading, write } = useContractWrite({
  //   mode: 'recklesslyUnprepared',
  //   addressOrName: accountModule?.address,
  //   contractInterface: accountModule?.abi,
  //   functionName: 'grantRole',
  //   args: [
  //     '6130245259',
  //     utils.formatBytes32String('stake'),
  //     '0x9b12d2A80fad64A5499e70bf74447C352c99fD46',
  //   ],
  //   chainId: accountModule?.chainId,
  // });

  return (
    <Box>
      <Container maxW="container.sm">
        <Box>
          <StakingNav />
          <StakingPositions data={stakingPositions} />
          <Heading size="md" mb="3">
            Stake Collateral
          </Heading>
          <Stake accountId={accountId} stakingPositions={stakingPositions} />
        </Box>
      </Container>
    </Box>
  );
}
