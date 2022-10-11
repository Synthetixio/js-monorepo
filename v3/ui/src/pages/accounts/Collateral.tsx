import { Heading, Text } from '@chakra-ui/react';
import { Stake } from '../../components/accounts/Stake/index';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export function Collateral() {
  const { id: _id } = useParams();

  return (
    <>
      <Helmet>
        <title>Manage Collateral</title>
        <meta name="description" content="Manage Collateral" />
      </Helmet>
      {/* <Subnav /> */}

      <Text mb="6">
        Enable the creation of synthetic assets on the blockchain by staking with Synthetix. Improve
        your c-ratio and reduce risk of liquidation by providing more collateral.
      </Text>

      {/* StakingPositions requires different props */}
      {/* <StakingPositions accountId={id} /> */}

      <Heading size="md" mb="3">
        Stake Additional Collateral
      </Heading>
      <Stake />
    </>
  );
}
