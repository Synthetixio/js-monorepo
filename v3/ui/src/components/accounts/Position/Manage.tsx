import { Custom } from './Manage/Custom';
import { Mint } from './Manage/Mint';
import { Preview } from './Manage/Preview';
import { Withdraw } from './Manage/Withdraw';
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react';

import { MaintainCRatio } from './Manage/MaintainCRatio';
import { useCallback, useState } from 'react';
import { useManagePosition } from '../../../hooks/useManagePosition';
import { Deposit } from './Manage/Deposit';
import { Burn } from './Manage/Burn';
import { useValidatePosition } from '../../../hooks/useValidatePosition';
import { useTranslation } from 'react-i18next';
import { CollateralType } from '../../../utils/types';

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

  const { exec, isLoading } = useManagePosition(
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
    <Box mt="6" mb="2">
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
            <Box mb="6">
              <Deposit
                onChange={setCollateralChange}
                value={collateralChange}
                collateral={collateral}
              />
            </Box>
            <Box mb="6">
              <Mint onChange={setDebtChange} value={debtChange} max={maxDebt} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box mb="6">
              <Burn value={-debtChange} onChange={(val) => setDebtChange(-val)} debt={debt} />
            </Box>
            <Box mb="6">
              <Withdraw
                collateral={collateral}
                collateralAmount={collateralAmount}
                onChange={(val) => setCollateralChange(-val)}
                value={-collateralChange}
              />
            </Box>
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
        <Button
          isLoading={isLoading}
          disabled={!isValid || noChange || isLoading}
          onClick={() => exec()}
          size="lg"
          width="100%"
          mb="2"
        >
          Update Position
        </Button>
      </Box>
    </Box>
  );
}
