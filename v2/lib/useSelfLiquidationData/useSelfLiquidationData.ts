import { useContext } from 'react';
import { useLiquidator } from '@snx-v2/useSynthetixContracts';
import { useQuery } from '@tanstack/react-query';
import { ContractContext } from '@snx-v2/ContractContext';
import { wei } from '@synthetixio/wei';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useLiquidationData } from '@snx-v2/useLiquidationData';
import { getHealthVariant } from '@snx-v2/getHealthVariant';

export const useSelfLiquidationData = () => {
  const { networkId, walletAddress } = useContext(ContractContext);

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
    isFlagged: undefined,
  });

  const enabled = Boolean(
    collateralInUsd &&
      debtBalance &&
      selfLiquidationPenalty &&
      SNXRate &&
      Liquidator &&
      health &&
      walletAddress
  );

  return useQuery(
    ['useSelfLiquidationData', networkId, walletAddress, enabled],
    async () => {
      if (
        !networkId ||
        !Liquidator ||
        !collateralInUsd ||
        !debtBalance ||
        !selfLiquidationPenalty ||
        !SNXRate ||
        !health ||
        !walletAddress
      ) {
        throw Error('Query should not be enabled if contracts or network are missing');
      }

      const [snxToLiquidateIncludingPenaltyBn, debtToRemoveBn] =
        await Liquidator.liquidationAmounts(walletAddress, true);

      const totalAmountToLiquidateSNX = wei(snxToLiquidateIncludingPenaltyBn);
      const totalAmountToLiquidateUSD = wei(totalAmountToLiquidateSNX).mul(SNXRate);

      // Remove penalty, to get amount required to get to target
      const amountToLiquidateToTargetSNX = totalAmountToLiquidateSNX.div(
        wei(1).add(selfLiquidationPenalty)
      );
      const amountToLiquidateToTargetUsd = amountToLiquidateToTargetSNX.mul(SNXRate);

      const selfLiquidationPenaltySNX = totalAmountToLiquidateSNX.sub(amountToLiquidateToTargetSNX);
      const selfLiquidationPenaltyUSD = selfLiquidationPenaltySNX.mul(SNXRate);

      return {
        selfLiquidationPenaltyPercent: selfLiquidationPenalty,
        selfLiquidationPenaltyUSD,
        selfLiquidationPenaltySNX,
        totalAmountToLiquidateUSD,
        totalAmountToLiquidateSNX,
        amountToLiquidateToTargetUsd,
        amountToLiquidateToTargetSNX,
        debtToRemove: wei(debtToRemoveBn),
      };
    },
    {
      enabled,
      staleTime: 10000,
    }
  );
};
