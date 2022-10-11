import { Custom } from './Manage/Custom';
import { Mint } from './Manage/Mint';
import { Preview } from './Manage/Preview';
import { Unstake } from './Manage/Unstake';
import { Text, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react';
import { CollateralType } from '../../../utils/constants';
import { MaintainCRatio } from './Manage/MaintainCRatio';
import { useCallback, useState } from 'react';
import { useManagePosition } from '../../../hooks/useManagePosition';
import { Stake } from './Manage/Stake';
import { Burn } from './Manage/Burn';
import { useValidatePosition } from '../../../hooks/useValidatePosition';
import { useTranslation } from 'react-i18next';

interface Props {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
  collateralAmount: number;
  collateralValue: number;
  debt: number;
  cRatio: number;
  refetch: () => void;
}

export default function Manage({
  collateral,
  accountId,
  poolId,
  collateralAmount,
  collateralValue,
  debt,
  cRatio,
  refetch,
}: Props) {
  const { t } = useTranslation();
  const [collateralChange, setCollateralChange] = useState(0);
  const [debtChange, setDebtChange] = useState(0);

  const reset = useCallback(() => {
    setCollateralChange(0);
    setDebtChange(0);
  }, []);

  const { exec } = useManagePosition(
    {
      collateral,
      accountId,
      poolId,
    },
    collateralChange,
    debtChange,
    collateralAmount,
    () => {
      reset();
      refetch();
    }
  );

  const { isValid, noChange, maxDebt } = useValidatePosition(
    {
      collateral,
      collateralAmount,
      collateralValue,
      debt,
    },
    collateralChange,
    debtChange
  );

  return (
    <Box mb="2">
      <Text mt="2" mb="6">
        {t('position.manage.title')}
      </Text>

      <Tabs isLazy onChange={reset} size="sm" variant="soft-rounded">
        <TabList justifyContent="space-between">
          <Tab>{t('position.manage.maintain')}</Tab>
          <Tab>{t('position.manage.borrow')}</Tab>
          <Tab>{t('position.manage.repay')}</Tab>
          <Tab>{t('position.manage.custom')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MaintainCRatio
              collateral={collateral}
              setCollateralChange={setCollateralChange}
              collateralChange={collateralChange}
              setDebtChange={setDebtChange}
              debtChange={debtChange}
              debt={debt}
            />
          </TabPanel>
          <TabPanel>
            <Stake
              onChange={setCollateralChange}
              value={collateralChange}
              collateral={collateral}
            />
            <Mint onChange={setDebtChange} value={debtChange} max={maxDebt} />
          </TabPanel>
          <TabPanel>
            <Burn value={-debtChange} onChange={(val) => setDebtChange(-val)} debt={debt} />
            <Unstake
              collateral={collateral}
              collateralAmount={collateralAmount}
              onChange={(val) => setCollateralChange(-val)}
              value={-collateralChange}
            />
          </TabPanel>
          <TabPanel>
            <Custom
              collateral={collateral}
              setCollateralChange={setCollateralChange}
              collateralAmount={collateralAmount}
              collateralChange={collateralChange}
              setDebtChange={setDebtChange}
              debtChange={debtChange}
              debt={debt}
              maxDebt={maxDebt}
            />
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
        <Button disabled={!isValid || noChange} onClick={exec} size="lg" width="100%" mb="2">
          Update Position
        </Button>
      </Box>
    </Box>
  );
}
