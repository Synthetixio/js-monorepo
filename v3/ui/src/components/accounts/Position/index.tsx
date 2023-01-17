import { DepositingStats } from './Callouts';
import { Box, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Manage from './Manage';
import { Rewards } from './Rewards/Rewards';
import { Pool } from './Pool';
import { FC } from 'react';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';

export const Position: FC<{
  accountId: string;
  poolId: string;
  collateral: CollateralType;
}> = ({ accountId, poolId, collateral }) => {
  const { isLoading, data, refetch } = useLiquidityPosition({
    accountId,
    poolId,
    tokenAddress: collateral.tokenAddress,
  });

  if (isLoading) {
    return (
      <Box my="8" textAlign="center">
        <Spinner />
      </Box>
    );
  }

  const { debt, cRatio, collateralAmount, collateralValue } = data || {};
  const debtNumber = debt?.toNumber() || 0;
  const cRatioNumber = cRatio?.toNumber() || 0;
  const collateralAmountNumber = collateralAmount?.toNumber() || 0;
  const collateralValueNumber = collateralValue?.toNumber() || 0;

  return (
    <>
      <DepositingStats
        collateral={collateral}
        collateralValue={collateralValueNumber}
        collateralAmount={collateralAmountNumber}
        debt={debtNumber}
        cRatio={cRatioNumber}
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
              collateralValue={collateralValueNumber}
              collateralAmount={collateralAmountNumber}
              debt={debtNumber}
              cRatio={cRatioNumber}
              accountId={accountId}
              poolId={poolId}
              collateral={collateral}
              refetch={refetch}
            />
          </TabPanel>
          <TabPanel>
            <Pool
              collateralAmount={collateralAmountNumber}
              accountId={accountId}
              poolId={poolId}
              collateral={collateral}
              debt={debtNumber}
              refetch={refetch}
            />
          </TabPanel>
          <TabPanel>
            <Rewards accountId={accountId} poolId={poolId} collateral={collateral} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
