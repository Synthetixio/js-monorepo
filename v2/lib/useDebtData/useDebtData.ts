import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { wei } from '@synthetixio/wei';
import { formatBytes32String } from '@ethersproject/strings';
import { useSynthetix, useLiquidator, useSystemSettings } from '@snx-v2/useSynthetixContracts';
import { BigNumber } from 'ethers';
import { ContractContext } from '@snx-v2/ContractContext';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';

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
  const { networkId, walletAddress: connectedWalletAddress } = useContext(ContractContext);
  const { data: Synthetix } = useSynthetix();
  const { data: Liquidator } = useLiquidator();
  const { data: SystemSettings } = useSystemSettings();
  const { delegateWallet } = useDelegateWallet();
  const walletAddress = delegateWallet?.address || connectedWalletAddress;

  return useQuery(
    ['v2debt', 'data', networkId, walletAddress],
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
        networkId && walletAddress !== null && Synthetix && Liquidator && SystemSettings
      ),
      select: processQueryData,
      staleTime: 10000,
    }
  );
};
