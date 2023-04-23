import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LargestWins,
  LargestLosses,
  LargestOpen,
  ClosestToLiquidation,
  DashboardActions,
} from '../components';
import { Traders, Trades } from '../components/Trades';

export const Dashboard: FC = () => {
  const navigate = useNavigate();

  return (
    <Box px="40px">
      <Heading mt={16} fontSize="36px">
        Dashboard
      </Heading>
      <Flex
        pt={8}
        pb={2}
        justifyContent="space-between"
        flexDirection={{ base: 'column-reverse', lg: 'row' }}
      >
        <Flex flexDir="column" width={{ base: '100%', lg: '60%' }}>
          <Heading fontSize="30px">Stats</Heading>
          <Flex justifyContent="space-between" width="100%">
            <Trades />
            <Traders />
          </Flex>
          <Flex mt={8} justifyContent="space-between">
            <Heading fontSize="30px">Latest Actions</Heading>
            <Button onClick={() => navigate('/actions')} variant="outline">
              See all actions
            </Button>
          </Flex>
          <DashboardActions />
        </Flex>
        <Flex
          flexDir="column"
          mr={{ base: 0, lg: 4 }}
          ml={{ base: 0, lg: 8 }}
          width={{ base: '100%', lg: '40%' }}
        >
          <Heading fontSize="30px">Leaderboard</Heading>
          <LargestOpen />
          <LargestWins />
          <LargestLosses />
          <ClosestToLiquidation />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Dashboard;
