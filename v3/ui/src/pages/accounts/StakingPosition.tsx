import { Container, Link, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Manage from '../../components/accounts/Position/Manage';
import Rewards from '../../components/accounts/Position/Rewards';
import Pool from '../../components/accounts/Position/Pool';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useParams, Link as NavLink } from 'react-router-dom';
import { StakingStats } from '../../components/accounts/StakingPositions/StakingStats';
import { useRecoilState } from 'recoil';
import { collateralTypesState } from '../../utils/state';
import { useMemo } from 'react';

export function StakingPosition() {
  const { id: accountId, poolId, collateral: collateralSymbol } = useParams();

  const [collateralTypes] = useRecoilState(collateralTypesState);

  const collateral = useMemo(() => {
    return collateralTypes.find(
      (item) => item.symbol.toLowerCase() === collateralSymbol?.toLocaleLowerCase()
    );
  }, [collateralTypes, collateralSymbol]);

  if (!collateral || !poolId || !accountId) return null;

  return (
    <Container>
      <Box mb="6">
        <NavLink to={`/accounts/${accountId}`}>
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
      <StakingStats accountId={accountId} poolId={poolId} collateral={collateral} />

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
