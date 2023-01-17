import { Box, Container, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { AccountNav } from '@snx-v3/AccountNav';
import { DepositingStats } from './DepositingStats';
import { Manage } from './Manage';
import { Rewards } from './Rewards';
import { Pool } from './Pool';

export function AccountPositionPage() {
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const liquidityPosition = useLiquidityPosition({
    accountId: params.accountId,
    poolId: params.poolId,
    tokenAddress: collateralType?.tokenAddress,
  });

  return (
    <Container>
      <AccountNav />
      {liquidityPosition.isFetched ? (
        <>
          <DepositingStats />

          <Tabs isFitted isLazy>
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
        </>
      ) : (
        <Box my="8" textAlign="center">
          <Spinner />
        </Box>
      )}
    </Container>
  );
}
