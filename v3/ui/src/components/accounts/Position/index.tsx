import { DepositingStats } from './Callouts';
import { Box, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Manage } from './Manage';
import { Rewards } from './Rewards/Rewards';
import { Pool } from './Pool';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';

export function Position({
  accountId,
  poolId,
  collateral,
}: {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
}) {
  const liquidityPosition = useLiquidityPosition({
    accountId,
    poolId,
    tokenAddress: collateral.tokenAddress,
  });

  if (liquidityPosition.isLoading) {
    return (
      <Box my="8" textAlign="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      <DepositingStats
        collateral={collateral}
        collateralValue={liquidityPosition.data?.collateralValue}
        collateralAmount={liquidityPosition.data?.collateralAmount}
        debt={liquidityPosition.data?.debt}
        cRatio={liquidityPosition.data?.cRatio}
      />

      <Tabs isFitted isLazy>
        <TabList>
          <Tab>Manage Position</Tab>
          <Tab>Pool Liquidity</Tab>
          <Tab>Claim Rewards</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Manage
              collateralValue={liquidityPosition.data?.collateralValue}
              collateralAmount={liquidityPosition.data?.collateralAmount}
              debt={liquidityPosition.data?.debt}
              cRatio={liquidityPosition.data?.cRatio}
              accountId={accountId}
              poolId={poolId}
              collateral={collateral}
              refetch={liquidityPosition.refetch}
            />
          </TabPanel>
          <TabPanel>
            <Pool
              collateralAmount={liquidityPosition.data?.collateralAmount}
              accountId={accountId}
              poolId={poolId}
              collateral={collateral}
              debt={liquidityPosition.data?.debt}
              refetch={liquidityPosition.refetch}
            />
          </TabPanel>
          <TabPanel>
            <Rewards accountId={accountId} poolId={poolId} collateral={collateral} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
