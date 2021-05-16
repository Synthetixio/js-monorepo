import { Provider, Contract } from 'ethcall';
import { useQuery, QueryConfig } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';
import erc20Abi from 'lib/abis/ERC20.json';
import zipObject from 'lodash/zipObject';
import omitBy from 'lodash/omitBy';
import mapValues from 'lodash/mapValues';
import keyBy from 'lodash/keyBy';
import { ethers } from 'ethers';

import QUERY_KEYS from '../../queryKeys';
import { CRYPTO_CURRENCY_MAP, CurrencyKey } from '../../currency';

import { Token } from '../tokenLists/types';
import { QueryContext } from '../../context';

export type Balances = Record<
	CurrencyKey,
	{
		balance: Wei;
		token: Token;
	}
>;

const ethcallProvider = new Provider();

const useTokensBalancesQuery = (ctx: QueryContext, tokens: Token[], walletAddress: string, options?: QueryConfig<Balances>) => {
	const symbols = tokens.map((token) => token.symbol);
	const tokensMap = keyBy(tokens, 'symbol');

	return useQuery<Balances>(
		QUERY_KEYS.WalletBalances.Tokens(walletAddress ?? '', ctx.network),
		async () => {
			// @ts-ignore
			await ethcallProvider.init(provider!);

			const calls = [];
			for (const { address, symbol } of tokens) {
				if (symbol === CRYPTO_CURRENCY_MAP.ETH) {
					calls.push(ethcallProvider.getEthBalance(walletAddress!));
				} else {
					const tokenContract = new Contract(address, erc20Abi);
					calls.push(tokenContract.balanceOf(walletAddress));
				}
			}

			const data = (await ethcallProvider.all(calls, {})) as ethers.BigNumber[];

			const balancesMap = zipObject(symbols, data);

			const positiveBalances = omitBy(balancesMap, (entry: ethers.BigNumber) => entry.lte(0));

			return mapValues(positiveBalances, (balance: ethers.BigNumber, symbol: string) => {
				const token = tokensMap[symbol];

				return {
					balance: wei(balance),
					token,
				};
			});
		},
		{
			enabled: tokens.length > 0,
			...options,
		}
	);
};

export default useTokensBalancesQuery;
