import { useContext } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { wei } from '@synthetixio/wei';
import { formatBytes32String } from '@ethersproject/strings';
import { getSynthetix, getLiquidator, getSystemSettings } from '@snx-v2/useSynthetixContracts';
import { SynthetixProvider } from '@synthetixio/providers';
import { BigNumber } from 'ethers';
import { ContractContext } from '@snx-v2/ContractContext';

const processQueryData = (
  result: [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ]
) => {
  const [
    targetCRatio,
    currentCRatio,
    transferable,
    debtBalance,
    collateral,
    issuableSynths,
    balance,
    targetThreshold,
    liquidationRatio,
  ] = result.map((item) => wei(item));
  const liquidationDeadlineForAccountBN = result[result.length - 1];
  return {
    targetCRatio,
    currentCRatio,
    targetCRatioPercentage: wei(1).div(targetCRatio).mul(100),
    currentCRatioPercentage: currentCRatio.gt(0) ? wei(1).div(currentCRatio).mul(100) : wei(0),
    transferable,
    debtBalance,
    collateral,
    issuableSynths,
    balance,
    targetThreshold,
    liquidationRatio,
    liquidationRatioPercentage: wei(1).div(liquidationRatio).mul(100),
    liquidationDeadlineForAccount: wei(liquidationDeadlineForAccountBN, 0),
  };
};

export const useDebtData = () => {
  const { provider, networkId, walletAddress, signer } = useContext(ContractContext);
  const [{ data: Synthetix }, { data: Liquidator }, { data: SystemSettings }] = useQueries({
    queries: [
      {
        queryKey: ['getSynthetix', networkId],
        queryFn: () => getSynthetix({ networkId, provider, signer }),
        staleTime: Infinity,
      },
      {
        queryKey: ['getLiquidator', networkId],
        queryFn: () => getLiquidator({ networkId, provider, signer }),
        staleTime: Infinity,
      },
      {
        queryKey: ['getSystemSettings', networkId],
        queryFn: () => getSystemSettings({ networkId, provider, signer }),
        staleTime: Infinity,
      },
    ],
  });

  return useQuery(
    ['debt', 'data', networkId, walletAddress],
    async () => {
      if (!walletAddress || !Synthetix || !Liquidator || !SystemSettings)
        throw Error('Query should not be enabled if contracts are missing');

      const sUSDBytes = formatBytes32String('sUSD');
      return Promise.all([
        SystemSettings.issuanceRatio(),
        Synthetix.collateralisationRatio(walletAddress),
        Synthetix.transferableSynthetix(walletAddress),
        Synthetix.debtBalanceOf(walletAddress, sUSDBytes),
        Synthetix.collateral(walletAddress),
        Synthetix.maxIssuableSynths(walletAddress),
        Synthetix.balanceOf(walletAddress),
        SystemSettings.targetThreshold(),
        Liquidator.liquidationRatio(),
        Liquidator.getLiquidationDeadlineForAccount(walletAddress),
      ]);
    },
    {
      enabled: Boolean(
        networkId && provider && walletAddress !== null && Synthetix && Liquidator && SystemSettings
      ),
      select: processQueryData,
      staleTime: 10000,
    }
  );
};
