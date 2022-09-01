import Custom from './Manage/Custom';
import Mint from './Manage/Mint';
import { Preview } from './Manage/Preview';
import Unstake from './Manage/Unstake';
import { Text, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react';
import { CollateralType } from '../../../utils/constants';
import { MaintainCRatio } from './Manage/MaintainCRatio';
import { useState } from 'react';
import { useManagePosition } from '../../../hooks/useManagePosition';

interface Props {
  accountId: string;
  fundId: string;
  collateral: CollateralType;
  collateralAmount: number;
  collateralValue: number;
  debt: number;
  cRatio: number;
}

export default function Manage({
  collateral,
  accountId,
  fundId,
  collateralAmount,
  collateralValue,
  debt,
  cRatio,
}: Props) {
  const [collateralChange, setCollateralChange] = useState(0);
  const [debtChange, setDebtChange] = useState(0);

  const { exec } = useManagePosition(
    {
      collateral,
      accountId,
      fundId,
    },
    collateralChange,
    debtChange,
    collateralAmount
  );

  return (
    <Box mb="2">
      <Text mt="2" mb="6">
        Manage your staking position by adjusting your collateral and debt.
      </Text>

      <Tabs size="sm" variant="soft-rounded" colorScheme="blue">
        <TabList justifyContent="space-between">
          <Tab>Maintain C-Ratio</Tab>
          <Tab>Borrow snxUSD</Tab>
          <Tab>Repay snxUSD</Tab>
          <Tab>Custom</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MaintainCRatio
              collateral={collateral}
              setCollateralChange={setCollateralChange}
              collateralChange={collateralChange}
              setDebtChange={setDebtChange}
              debtChange={debtChange}
            />
          </TabPanel>
          <TabPanel>
            {/* <Stake {...{collateral, accountId, fundId }} /> */}
            <Mint {...{ collateral, accountId, fundId }} />
          </TabPanel>
          <TabPanel>
            {/* <Burn /> */}
            <Unstake />
          </TabPanel>
          <TabPanel>
            <Custom />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Preview
        collateral={collateral}
        collateralAmount={collateralAmount}
        collateralValue={collateralValue}
        debt={debt}
        cRatio={cRatio}
        collateralChange={collateralChange}
        debtChange={debtChange}
      />

      <Box px="4">
        <Button onClick={exec} colorScheme="blue" size="lg" width="100%" mb="2">
          Update Position
        </Button>
      </Box>
    </Box>
  );
}
