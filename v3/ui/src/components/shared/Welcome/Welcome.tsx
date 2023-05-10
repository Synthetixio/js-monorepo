import { Flex, Box, Alert, AlertIcon, AlertTitle, AlertDescription, Link } from '@chakra-ui/react';

export const Welcome = () => (
  <Flex alignItems="flex-end" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
    <Box flexGrow={1}>
      <Alert status="warning">
        <AlertIcon />
        <Box>
          <AlertTitle>This is an experimental prototype.</AlertTitle>
          <AlertDescription>
            You may prefer to use the{' '}
            <Link href="https://staking.synthetix.io">Synthetix V2 staking app</Link>.
          </AlertDescription>
        </Box>
      </Alert>
    </Box>
  </Flex>
);
