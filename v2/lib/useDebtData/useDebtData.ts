import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { wei } from '@synthetixio/wei';
import { formatBytes32String } from '@ethersproject/strings';
import { useSynthetix, useLiquidator, useSystemSettings } from '@snx-v2/useSynthetixContracts';
import { BigNumber } from 'ethers';
import { ContractContext } from '@snx-v2/ContractContext';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';
import { useSynthetixV3 } from '@snx-v2/useSynthetixContracts/useSynthetixV3';
import { formatUnits } from 'ethers/lib/utils';

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
    liquidationRatioPercentage: liquidationRatio,
    liquidationDeadlineForAccount: wei(liquidationDeadlineForAccountBN, 0),
  };
};

export const useDebtData = () => {
  const { networkId, walletAddress: connectedWalletAddress } = useContext(ContractContext);
  const { data: Synthetix } = useSynthetix();
  const { data: SynthetixV3 } = useSynthetixV3();
  const { data: Liquidator } = useLiquidator();
  const { data: SystemSettings } = useSystemSettings();
  const { delegateWallet } = useDelegateWallet();
  const walletAddress = delegateWallet?.address || connectedWalletAddress;

  return useQuery({
    queryKey: ['v2debt', 'data', `${networkId}`, `${walletAddress}`],
    queryFn: async () => {
      if (!walletAddress || !Synthetix || !Liquidator || !SystemSettings)
        throw Error('Query should not be enabled if contracts are missing');

      const sUSDBytes = formatBytes32String('sUSD');

      const getLiqudationRatio = async () => {
        if (networkId === 1) {
          const result = await SynthetixV3?.getCollateralConfiguration(
            '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F'
          );

          return wei(formatUnits(result?.liquidationRatioD18?.toString() || '0')).mul(100);
        }
        const liqudationRatio = await Liquidator.liquidationRatio();
        return wei(1).div(liqudationRatio).mul(100);
      };

      return Promise.all([
        SystemSettings.issuanceRatio(),
        Synthetix.collateralisationRatio(walletAddress),
        Synthetix.transferableSynthetix(walletAddress),
        Synthetix.debtBalanceOf(walletAddress, sUSDBytes),
        Synthetix.collateral(walletAddress),
        Synthetix.maxIssuableSynths(walletAddress),
        Synthetix.balanceOf(walletAddress),
        SystemSettings.targetThreshold(),
        getLiqudationRatio(),
        Liquidator.getLiquidationDeadlineForAccount(walletAddress),
      ]);
    },
    enabled: Boolean(
      networkId && walletAddress !== null && Synthetix && Liquidator && SystemSettings
    ),
    select: processQueryData,
    staleTime: 10000,
  });
};
