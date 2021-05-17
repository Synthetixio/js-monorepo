import { useQuery, UseQueryOptions } from 'react-query';
import { ethers } from 'ethers';
import orderBy from 'lodash/orderBy';
import Wei, { wei } from '@synthetixio/wei';

import { CurrencyKey } from '../../currency';
import { QueryContext } from '../../context';

export type SynthBalance = {
	currencyKey: CurrencyKey;
	balance: Wei;
	usdBalance: Wei;
};

export type SynthBalancesMap = Record<CurrencyKey, SynthBalance>;

type SynthBalancesTuple = [CurrencyKey[], number[], number[]];

export type Balances = {
	balancesMap: SynthBalancesMap;
	balances: SynthBalance[];
	totalUSDBalance: Wei;
};

const useSynthsBalancesQuery = (ctx: QueryContext, walletAddress: string, options?: UseQueryOptions<Balances>) => {
	return useQuery<Balances>(
		['walletBalances', 'synths', ctx.network, walletAddress],
		async () => {
			const balancesMap: SynthBalancesMap = {};
			const [
				currencyKeys,
				synthsBalances,
				synthsUSDBalances,
			] = (await ctx.snxjs.contracts.SynthUtil!.synthsBalances(
				walletAddress
			)) as SynthBalancesTuple;

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
				balancesMap,
				balances: orderBy(
					Object.values(balancesMap),
					(balance: SynthBalance) => balance.usdBalance.toNumber(),
					'desc'
				),
				totalUSDBalance,
			};
		},
		{
			enabled: !!walletAddress,
			...options,
		}
	);
};

export default useSynthsBalancesQuery;
