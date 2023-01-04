import { DepositingStats } from './Callouts';
import { Box, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Manage from './Manage';
import { Rewards } from './Rewards/Rewards';
import { Pool } from './Pool';
import { FC } from 'react';
import { CollateralType } from '../../../utils/types';
import { formatValue } from '@snx-v3/format';
import { useLiquidityPosition } from '../../../hooks/useLiquidityPosition';

export const Position: FC<{
  accountId: string;
  poolId: string;
  collateral: CollateralType;
}> = ({ accountId, poolId, collateral }) => {
  const { isLoading, debt, cRatio, collateralAmount, refetch } = useLiquidityPosition(
    accountId,
    poolId,
    collateral
  );

  if (isLoading)
    return (
      <Box my="8" textAlign="center">
        <Spinner />
      </Box>
    );

  const price = formatValue(collateral.price || 0);
  const collateralValue = collateralAmount * price;

  return (
    <>
      <DepositingStats
        collateral={collateral}
        collateralValue={collateralValue}
        collateralAmount={collateralAmount}
        debt={debt}
        cRatio={cRatio}
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
              collateralValue={collateralValue}
              collateralAmount={collateralAmount}
              debt={debt}
              cRatio={cRatio}
              accountId={accountId}
              poolId={poolId}
              collateral={collateral}
              refetch={refetch}
            />
          </TabPanel>
          <TabPanel>
            <Pool
              collateralAmount={collateralAmount}
              accountId={accountId}
              poolId={poolId}
              collateral={collateral}
              debt={debt}
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
