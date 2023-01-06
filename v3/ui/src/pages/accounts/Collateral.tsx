import { Heading, Text } from '@chakra-ui/react';
import { Deposit } from '../../components/accounts/Deposit';
import { Helmet } from 'react-helmet';

export function Collateral() {
  return (
    <>
      <Helmet>
        <title>Manage Collateral</title>
        <meta name="description" content="Manage Collateral" />
      </Helmet>
      {/* <Subnav /> */}

      <Text mb="6">
        Enable the creation of synthetic assets on the blockchain by depositing with Synthetix.
        Improve your c-ratio and reduce risk of liquidation by providing more collateral.
      </Text>

      {/* LiquidityPositions requires different props */}
      {/* <LiquidityPositions accountId={id} /> */}

      <Heading size="md" mb="3">
        Deposit Additional Collateral
      </Heading>
      <Deposit />
    </>
  );
}
