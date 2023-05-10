import { Flex, Box, Alert, AlertIcon, Text, Link } from '@chakra-ui/react';

export const Welcome = () => (
  <Flex alignItems="flex-end" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
    <Box flexGrow={1}>
      <Alert status="warning">
        <AlertIcon />
        <Box>
          <Text fontWeight="bold" display="inline">
            This is an experimental prototype for Synthetix V3.
          </Text>{' '}
          You may prefer to use the{' '}
          <Link textDecoration="underline" href="https://staking.synthetix.io">
            Synthetix V2 staking app
          </Link>
          .
        </Box>
      </Alert>
    </Box>
  </Flex>
);
