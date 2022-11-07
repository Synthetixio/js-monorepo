import { useContext } from 'react';
import { useLiquidator } from '@snx-v2/useSynthetixContracts';
import { useQuery } from '@tanstack/react-query';
import { ContractContext } from '@snx-v2/ContractContext';
import { wei } from '@synthetixio/wei';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useLiquidationData } from '@snx-v2/useLiquidationData';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { BigNumber } from '@ethersproject/bignumber';

export const useSelfLiquidationData = () => {
  const { networkId } = useContext(ContractContext);

  const { data: Liquidator } = useLiquidator();
  const { data: debtData } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: liquidationData } = useLiquidationData();
  const {
    debtBalance,
    collateral,
    targetCRatioPercentage,
    currentCRatioPercentage,
    liquidationRatioPercentage,
    targetThreshold,
  } = debtData || {};
  const { SNX: SNXRate } = exchangeRateData || {};
  const { selfLiquidationPenalty } = liquidationData || {};
  const collateralInUsd = SNXRate ? collateral?.mul(SNXRate) : undefined;
  const health = getHealthVariant({
    targetCratioPercentage: targetCRatioPercentage?.toNumber(),
    currentCRatioPercentage: currentCRatioPercentage?.toNumber(),
    liquidationCratioPercentage: liquidationRatioPercentage?.toNumber(),
    targetThreshold: targetThreshold?.toNumber(),
  });
  const enabled = Boolean(
    collateralInUsd && debtBalance && selfLiquidationPenalty && SNXRate && Liquidator && health
  );

  return useQuery(
    ['useSelfLiquidationData', networkId, enabled],
    async () => {
      if (
        !networkId ||
        !Liquidator ||
        !collateralInUsd ||
        !debtBalance ||
        !selfLiquidationPenalty ||
        !SNXRate ||
        !health
      ) {
        throw Error('Query should not be enabled if contracts or network are missing');
      }

      const [amountToLiquidateBn, amountToLiquidateNoPenaltyBn] = await Promise.all([
        health === 'success'
          ? BigNumber.from(0)
          : Liquidator.calculateAmountToFixCollateral(
              debtBalance.toBN(),
              collateralInUsd.toBN(),
              selfLiquidationPenalty.toBN()
            ),
        health === 'success'
          ? BigNumber.from(0)
          : Liquidator.calculateAmountToFixCollateral(
              debtBalance.toBN(),
              collateralInUsd.toBN(),
              wei(0).toBN()
            ),
      ]);
      const amountToLiquidate = wei(amountToLiquidateBn);
      const amountToLiquidateNoPenalty = wei(amountToLiquidateNoPenaltyBn);
      const selfLiquidationPenaltyDollar = amountToLiquidate.sub(amountToLiquidateNoPenalty);
      const selfLiquidationPenaltySNX = selfLiquidationPenaltyDollar.gt(0)
        ? selfLiquidationPenaltyDollar.div(SNXRate)
        : wei(0);

      return {
        selfLiquidationPenalty: selfLiquidationPenalty,
        selfLiquidationPenaltyDollar,
        selfLiquidationPenaltySNX,
        amountToLiquidate,
        amountToLiquidateNoPenalty,
      };
    },
    {
      enabled,
      staleTime: 10000,
    }
  );
};
