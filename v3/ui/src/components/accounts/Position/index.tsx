import { StakingStats } from './StakingStats';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react';
import Manage from './Manage';
import Rewards from './Rewards';
import Pool from './Pool';
import { FC } from 'react';
import { CollateralType } from '../../../utils/types';
import { formatValue } from '../../../utils/helpers';
import { useStakingPosition } from '../../../hooks/useStakingPosition';

interface Props {
  accountId: string;
  fundId: string;
  collateral: CollateralType;
}

export const Position: FC<Props> = ({ accountId, fundId, collateral }) => {
  const {
    isLoading,
    debt,
    cRatio,
    collateralAmount: collateralAmountBN,
  } = useStakingPosition(accountId, fundId, collateral);

  if (isLoading) return <Spinner />;

  const { decimals, price: priceBN, priceDecimals } = collateral;

  const collateralAmount = formatValue(collateralAmountBN, decimals);
  const price = formatValue(priceBN!, priceDecimals!);
  const collateralValue = collateralAmount * price;

  return (
    <>
      <StakingStats
        collateral={collateral}
        collateralValue={collateralValue}
        collateralAmount={collateralAmount}
        debt={debt}
        cRatio={cRatio}
      />

      <Tabs isFitted>
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
              fundId={fundId}
              collateral={collateral}
            />
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
  );
};
