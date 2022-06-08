import { useQuery, UseQueryOptions } from 'react-query';
import { ethers } from 'ethers';
import orderBy from 'lodash/orderBy';
import Wei, { wei } from '@synthetixio/wei';

import { CurrencyKey } from '@synthetixio/contracts-interface';
import { QueryContext } from '../../context';
import { Balances, SynthBalance, SynthBalancesMap } from '../../types';

type SynthBalancesTuple = [CurrencyKey[], ethers.BigNumber[], ethers.BigNumber[]];

const useSynthsBalancesQuery = (
	ctx: QueryContext,
	walletAddress: string | null,
	options?: UseQueryOptions<Balances>
) => {
	return useQuery<Balances>(
		['walletBalances', 'synths', ctx.networkId, walletAddress],
		async () => {
			if (!ctx.snxjs) {
				// This should never happen since the query is not enabled when ctx.snxjs is undefined
				throw Error('ctx.snxjs is undefined');
			}
			const balancesMap: SynthBalancesMap = {};
			const [currencyKeys, synthsBalances, synthsUSDBalances]: SynthBalancesTuple =
				await ctx.snxjs.contracts.SynthUtil.synthsBalances(walletAddress);

			let totalUSDBalance = wei(0);

			currencyKeys.forEach((currencyKey: string, idx: number) => {
				const balance = wei(synthsBalances[idx]);

				// discard empty balances
				if (balance.gt(0)) {
					const synthName = ethers.utils.parseBytes32String(currencyKey) as CurrencyKey;
					const usdBalance = wei(synthsUSDBalances[idx]);

					balancesMap[synthName] = {
						currencyKey: synthName,
						balance,
						usdBalance,
					};

					totalUSDBalance = totalUSDBalance.add(usdBalance);
				}
			});

			return {
				balancesMap: balancesMap as SynthBalancesMap,
				balances: orderBy(
					Object.values(balancesMap as SynthBalancesMap),
					(balance: SynthBalance) => balance.usdBalance.toNumber(),
					'desc'
				),
				totalUSDBalance,
			};
		},
		{
			enabled: !!ctx.snxjs && !!walletAddress,
			...options,
		}
	);
};

export default useSynthsBalancesQuery;
