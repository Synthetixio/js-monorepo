import { Container, Link, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Stats from '../../../components/accounts/Position/Stats';
import Manage from '../../../components/accounts/Position/Manage';
import Rewards from '../../../components/accounts/Position/Rewards';
import Pool from '../../../components/accounts/Position/Pool';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useParams, Link as NavLink } from 'react-router-dom';

export function StakingPosition() {
  const { id } = useParams();

  return (
    <Container>
      <Box mb="6">
        <NavLink to={`/accounts/${id}/positions`}>
          <Link
            fontSize="xs"
            fontWeight="normal"
            color="blue.400"
            _hover={{ textDecoration: 'none' }}
          >
            <ChevronLeftIcon transform="translateY(-1px)" /> View all staking positions
          </Link>
        </NavLink>
      </Box>
      <Stats />

      <Tabs isFitted>
        <TabList>
          <Tab>Manage Position</Tab>
          <Tab>Pool Liquidity</Tab>
          <Tab>Claim Rewards</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Manage />
          </TabPanel>
          <TabPanel>
            <Pool />
          </TabPanel>
          <TabPanel>
            <Rewards />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
