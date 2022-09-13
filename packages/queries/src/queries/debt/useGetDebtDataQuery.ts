import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import Wei from '@synthetixio/wei';

import { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';
import { formatBytes32String } from '@ethersproject/strings';
import { formatEther } from '@ethersproject/units';

type WalletDebtData = {
  targetCRatio: Wei;
  currentCRatio: Wei;
  transferable: Wei;
  debtBalance: Wei;
  collateral: Wei;
  issuableSynths: Wei;
  balance: Wei;
  totalSupply: Wei;
  targetThreshold: Wei;
};

const useGetDebtDataQuery = (
  ctx: QueryContext,
  walletAddress: string | null,
  options?: UseQueryOptions<WalletDebtData>
) => {
  return useQuery<WalletDebtData>(
    ['debt', 'data', ctx.networkId, walletAddress],
    async () => {
      if (!ctx.snxjs) throw Error('Expected snxjs to be defined');
      const {
        contracts: { SystemSettings, Synthetix },
      } = ctx.snxjs;
      const sUSDBytes = formatBytes32String('sUSD');
      const result = await Promise.all([
        SystemSettings.issuanceRatio(),
        Synthetix.collateralisationRatio(walletAddress),
        Synthetix.transferableSynthetix(walletAddress),
        Synthetix.debtBalanceOf(walletAddress, sUSDBytes),
        Synthetix.collateral(walletAddress),
        Synthetix.maxIssuableSynths(walletAddress),
        Synthetix.balanceOf(walletAddress),
        Synthetix.totalSupply(),
        SystemSettings.targetThreshold(),
      ]);
      const [
        targetCRatio,
        currentCRatio,
        transferable,
        debtBalance,
        collateral,
        issuableSynths,
        balance,
        totalSupply,
        targetThreshold,
      ] = result.map((item) => wei(formatEther(item)));
      return {
        targetCRatio,
        currentCRatio,
        transferable,
        debtBalance,
        collateral,
        issuableSynths,
        balance,
        totalSupply,
        targetThreshold,
      };
    },
    {
      enabled: ctx.networkId !== null && walletAddress !== null,
      ...options,
    }
  );
};

export default useGetDebtDataQuery;
