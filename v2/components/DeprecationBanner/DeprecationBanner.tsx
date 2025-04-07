import { Alert, AlertIcon, Link, Text } from '@chakra-ui/react';

export function DeprecationBanner() {
  return (
    <Alert status="warning" mb="6">
      <AlertIcon />
      <Text>
        As part of the migration to protocol managed liquidity and the deprecation of legacy
        staking, we recently migrated all accounts from Synthetix v2x to v3. You can see more
        information about your position on
        <Link color="cyan.400" isExternal={true} href="https://liquidity.synthetix.io">
          the Synthetix Liquidity website
        </Link>
      </Text>
    </Alert>
  );
}
