import { useQuery } from 'react-query';
import { wei } from '@synthetixio/wei';
import { formatBytes32String } from '@ethersproject/strings';
import { useGetSynthetixContracts, NetworkId } from '@snx-v2/useSynthetixContracts';
import { SynthetixProvider } from '@synthetixio/providers';
import { BigNumber } from 'ethers';
import type { SynthetixAbiTypes } from '@synthetixio/contracts/build/mainnet/deployment/SynthetixAbiTypes';
import type { SystemSettingsAbiTypes } from '@synthetixio/contracts/build/mainnet/deployment/SystemSettingsAbiTypes';
import type { LiquidatorAbiTypes } from '@synthetixio/contracts/build/mainnet/deployment/LiquidatorAbiTypes';

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
  return {
    targetCRatio,
    currentCRatio,
    targetCRatioPercentage: wei(1).div(targetCRatio).mul(100),
    currentCRatioPercentage: wei(1).div(currentCRatio).mul(100),
    transferable,
    debtBalance,
    collateral,
    issuableSynths,
    balance,
    targetThreshold,
    liquidationRatio,
    liquidationRatioPercentage: wei(1).div(currentCRatio).mul(100),
  };
};

const useGetDebtDataQuery = (
  networkId: NetworkId,
  provider: SynthetixProvider,
  walletAddress: string | null
) => {
  const { data: contracts } = useGetSynthetixContracts({
    contractNames: ['Synthetix', 'SystemSettings', 'Liquidator'],
    provider: provider,
    networkId,
  });
  return useQuery(
    ['debt', 'data', networkId, walletAddress],
    async () => {
      if (!contracts || !walletAddress)
        throw Error('Query should not be enable is contracts missing');

      const [Synthetix, SystemSettings, Liquidator] = contracts as [
        SynthetixAbiTypes,
        SystemSettingsAbiTypes,
        LiquidatorAbiTypes
      ];
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
      ]);
    },
    {
      enabled: Boolean(networkId !== null && walletAddress !== null && contracts),
      select: processQueryData,
      staleTime: 10000,
    }
  );
};

export default useGetDebtDataQuery;
