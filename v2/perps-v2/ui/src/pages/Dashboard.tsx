import React from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LargestWins,
  LargestLosses,
  LargestOpen,
  ClosestToLiquidation,
  DashboardActions,
} from '../components';
import { Fees, Traders, Trades, Volume } from '../components/Dashboard';
import { Markets } from '../components/Dashboard/Markets';

export const Dashboard: FC = () => {
  const navigate = useNavigate();

  return (
    <Box px={{ base: '16px', md: '40px' }}>
      <Flex
        mt={[8, 16]}
        pb={2}
        justifyContent="space-between"
        flexDirection={{ base: 'column-reverse', lg: 'column' }}
      >
        <Flex flexDir="column" width={{ base: '100%', lg: '100%' }} mt={[8, 0]}>
          <Heading color="#00D1FF" fontSize="24px">
            Stats
          </Heading>
          <Flex
            justifyContent="space-between"
            width="100%"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Volume width={{ base: '100%', md: '32%' }} />
            <Fees width={{ base: '100%', md: '32%' }} />
            <Trades width={{ base: '100%', md: '32%' }} />
          </Flex>
          <Flex
            justifyContent="space-between"
            width="100%"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Traders width={{ base: '100%', md: '32%' }} />
          </Flex>
          <Flex mt={8} flexDir="column" width={{ base: '100%', lg: '100%' }}>
            <Flex mt={2} justifyContent="space-between">
              <Heading color="#00D1FF" fontSize="24px">
                Markets
              </Heading>
              <Button onClick={() => navigate('/markets')} variant="outline">
                See all markets <ArrowUpIcon ml={2} transform="rotate(45deg)" />
              </Button>
            </Flex>
            <Markets />
          </Flex>
        </Flex>

        <Flex mt={8} flexDir="column" width={{ base: '100%', lg: '100%' }}>
          <Heading color="#00D1FF" fontSize="24px">
            Leaderboard
          </Heading>
          <Flex
            justifyContent="space-between"
            width="100%"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Flex width={{ base: '100%', md: '49%' }}>
              <LargestOpen />
            </Flex>
            <Flex width={{ base: '100%', md: '49%' }}>
              <LargestWins />
            </Flex>
          </Flex>
          <Flex
            justifyContent="space-between"
            width="100%"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Flex width={{ base: '100%', md: '49%' }}>
              <LargestLosses />
            </Flex>

            <Flex width={{ base: '100%', md: '49%' }}>
              <ClosestToLiquidation />
            </Flex>
          </Flex>
        </Flex>
        <Box >
          <Flex mt={[0, 8]} justifyContent="space-between">
            <Heading color="#00D1FF" fontSize="24px">
              Latest Actions
            </Heading>
            <Button onClick={() => navigate('/actions')} variant="outline">
              See all actions <ArrowUpIcon ml={2} transform="rotate(45deg)" />
            </Button>
          </Flex>
          <DashboardActions />
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;