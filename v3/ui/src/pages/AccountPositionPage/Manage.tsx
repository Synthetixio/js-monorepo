import { Custom } from './Manage/Custom';
import { Mint } from './Manage/Mint';
import { Preview } from './Manage/Preview';
import { Withdraw } from './Manage/Withdraw';
import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { MaintainCRatio } from './Manage/MaintainCRatio';
import { useCallback, useState } from 'react';
import { useManagePosition } from './useManagePosition';
import { Deposit } from './Manage/Deposit';
import { Burn } from './Manage/Burn';
import { useValidatePosition } from '@snx-v3/useValidatePosition';
import { useTranslation } from 'react-i18next';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';

export function Manage() {
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const liquidityPosition = useLiquidityPosition({
    accountId: params.accountId,
    poolId: params.poolId,
    tokenAddress: collateralType?.tokenAddress,
  });

  const { t } = useTranslation();
  const [collateralChange, setCollateralChange] = useState(0);
  const [debtChange, setDebtChange] = useState(0);

  const reset = useCallback(() => {
    setCollateralChange(0);
    setDebtChange(0);
  }, []);

  const { exec, isLoading } = useManagePosition({
    accountId: params.accountId,
    poolId: params.poolId,
    collateralType,
    collateralChange,
    debtChange,
    collateralAmount: liquidityPosition.data?.collateralAmount,
    refetch: () => {
      reset();
      liquidityPosition.refetch();
    },
  });

  const { isValid, noChange, maxDebt } = useValidatePosition({
    collateral: collateralType,
    collateralAmount: liquidityPosition.data?.collateralAmount,
    collateralValue: liquidityPosition.data?.collateralValue,
    debt: liquidityPosition.data?.debt,
    collateralChange,
    debtChange,
  });

  if (!(collateralType && liquidityPosition.data)) {
    return null;
  }

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
              collateral={collateralType}
              setCollateralChange={setCollateralChange}
              collateralChange={collateralChange}
              setDebtChange={setDebtChange}
              debtChange={debtChange}
              debt={liquidityPosition.data.debt}
            />
          </TabPanel>
          <TabPanel>
            <Box mb="6">
              <Deposit
                onChange={setCollateralChange}
                value={collateralChange}
                collateral={collateralType}
              />
            </Box>
            <Box mb="6">
              <Mint onChange={setDebtChange} value={debtChange} max={maxDebt} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box mb="6">
              <Burn
                value={-debtChange}
                onChange={(val) => setDebtChange(-val)}
                debt={liquidityPosition.data.debt}
              />
            </Box>
            <Box mb="6">
              <Withdraw
                collateral={collateralType}
                collateralAmount={liquidityPosition.data.collateralAmount}
                onChange={(val) => setCollateralChange(-val)}
                value={-collateralChange}
              />
            </Box>
          </TabPanel>
          <TabPanel>
            <Custom
              collateral={collateralType}
              setCollateralChange={setCollateralChange}
              collateralAmount={liquidityPosition.data.collateralAmount}
              collateralChange={collateralChange}
              setDebtChange={setDebtChange}
              debtChange={debtChange}
              debt={liquidityPosition.data.debt}
              maxDebt={maxDebt}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Preview
        collateral={collateralType}
        collateralAmount={liquidityPosition.data.collateralAmount}
        collateralValue={liquidityPosition.data.collateralValue}
        debt={liquidityPosition.data.debt}
        cRatio={liquidityPosition.data.cRatio}
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
