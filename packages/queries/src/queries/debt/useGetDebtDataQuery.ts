import { useQuery, UseQueryOptions } from 'react-query';
import Wei from '@synthetixio/wei';

import { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';

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
        utils,
      } = ctx.snxjs;
      const sUSDBytes = utils.formatBytes32String('sUSD');
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
      ] = result.map((item) => wei(utils.formatEther(item)));
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
