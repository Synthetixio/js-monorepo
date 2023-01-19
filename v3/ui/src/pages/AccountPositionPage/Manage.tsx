import { Custom } from './Manage/Custom';
import { Mint } from './Manage/Mint';
import { Preview } from './Manage/Preview';
import { Withdraw } from './Manage/Withdraw';
import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { MaintainCRatio } from './Manage/MaintainCRatio';
import { useCallback, useMemo, useState, FormEvent } from 'react';
import { useManagePosition } from './useManagePosition';
import { Deposit } from './Manage/Deposit';
import { Burn } from './Manage/Burn';
import { validatePosition } from '@snx-v3/validatePosition';
import { useTranslation } from 'react-i18next';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { wei } from '@synthetixio/wei';

export function Manage() {
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const liquidityPosition = useLiquidityPosition({
    accountId: params.accountId,
    poolId: params.poolId,
    tokenAddress: collateralType?.tokenAddress,
  });

  const { t } = useTranslation();
  const [collateralChange, setCollateralChange] = useState(wei(0));
  const [debtChange, setDebtChange] = useState(wei(0));

  const reset = useCallback(() => {
    setCollateralChange(wei(0));
    setDebtChange(wei(0));
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

  const { isValid, maxDebt } = useMemo(
    () =>
      validatePosition({
        issuanceRatioD18: collateralType?.issuanceRatioD18,
        collateralAmount: liquidityPosition.data?.collateralAmount,
        collateralValue: liquidityPosition.data?.collateralValue,
        debt: liquidityPosition.data?.debt,
        collateralChange,
        debtChange,
      }),
    [
      collateralType?.issuanceRatioD18,
      liquidityPosition.data?.collateralAmount,
      liquidityPosition.data?.collateralValue,
      liquidityPosition.data?.debt,
      collateralChange,
      debtChange,
    ]
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      if (!form.reportValidity() || !isValid) {
        return;
      }
      exec();
    },
    [exec, isValid]
  );

  if (!(collateralType && liquidityPosition.data)) {
    return null;
  }

  return (
    <Box as="form" mt="6" mb="2" onSubmit={onSubmit}>
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
              <Mint
                value={debtChange}
                onChange={setDebtChange}
                maxDebt={maxDebt}
                collateral={collateralType}
              />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box mb="6">
              <Burn
                value={debtChange.mul(-1)}
                onChange={(val) => setDebtChange(val.mul(-1))}
                debt={liquidityPosition.data.debt}
              />
            </Box>
            <Box mb="6">
              <Withdraw
                value={collateralChange.mul(-1)}
                onChange={(val) => setCollateralChange(val.mul(-1))}
                collateral={collateralType}
                collateralAmount={liquidityPosition.data.collateralAmount}
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
          type="submit"
          isLoading={isLoading}
          disabled={!isValid || (!debtChange && !collateralChange) || isLoading}
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
