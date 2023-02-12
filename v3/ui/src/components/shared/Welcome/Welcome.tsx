import { FC } from 'react';
import { Flex, Heading, Box, Link, Text } from '@chakra-ui/react';

interface WelcomeProps {
  Banner?: string | FC;
}

export const Welcome = ({ Banner = 'Welcome to Synthetix V3' }: WelcomeProps) => (
  <Flex alignItems="flex-end" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
    <Box flexGrow={1} mr={12}>
      <Flex mb={2}>
        {typeof Banner === 'string' ? (
          <Heading color="white">Welcome to Synthetix V3</Heading>
        ) : (
          <Banner />
        )}
      </Flex>
      <Text color="gray.500" fontSize="sm">
        Deposit your collateral to borrow snxUSD and contribute to the network collateral. If you
        have never staked on Synthetix V3 before, please read through this{' '}
        <Link color="cyan.500" href="https://docs.synthetix.io/" target="_blank">
          quick introduction
        </Link>{' '}
        first.
      </Text>
    </Box>
  </Flex>
);
