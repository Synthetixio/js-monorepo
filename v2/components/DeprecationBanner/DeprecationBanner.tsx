import { Alert, AlertIcon, Link, Text } from '@chakra-ui/react';

export function DeprecationBanner() {
  return (
    <Alert status="warning" mb="6">
      <AlertIcon />
      <Text>
        From March 24th 2025 the liquidation ratio is being raised on legacy positions.{' '}
        <Link color="cyan.400" isExternal={true} href="https://420.synthetix.io">
          Migrate to 420 Pool immediately.
        </Link>
      </Text>
    </Alert>
  );
}
