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

export const Dashboard: FC = () => {
  const navigate = useNavigate();
  return (
    <Box px="40px">
      <Heading mt={8} fontSize="36px">
        Dashboard
      </Heading>
      <Flex pt={8} pb={2} justifyContent="space-between">
        <Flex flexDir="column">
          <Heading fontSize="30px">Stats</Heading>
          <Flex mt={8} justifyContent="space-between">
            <Heading fontSize="30px">Latest Actions</Heading>
            <Button onClick={() => navigate('/actions')} variant="outline">
              See all actions
            </Button>
          </Flex>
          <DashboardActions />
        </Flex>
        <Flex flexDir="column" mr={4}>
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
