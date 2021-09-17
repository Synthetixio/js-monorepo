import { useQuery, UseQueryOptions } from 'react-query';
import { wei } from '@synthetixio/wei';
import erc20Abi from '../../abis/ERC20.json';
import zipObject from 'lodash/zipObject';
import omitBy from 'lodash/omitBy';
import mapValues from 'lodash/mapValues';
import keyBy from 'lodash/keyBy';
import { ethers } from 'ethers';

import { CRYPTO_CURRENCY_MAP } from '../../currency';

import { QueryContext } from '../../context';
import { Token, TokenBalances } from '../../types';

const useTokensBalancesQuery = (
	ctx: QueryContext,
	tokens: Token[],
	walletAddress: string | null,
	options?: UseQueryOptions<TokenBalances>
) => {
	const symbols = tokens.map((token) => token.symbol);
	const tokensMap = keyBy(tokens, 'symbol');

	return useQuery<TokenBalances>(
		['walletBalances', 'tokens', ctx.networkId, walletAddress],
		async () => {
			// @ts-ignore
			const calls = [];
			for (const { address, symbol } of tokens) {
				if (symbol === CRYPTO_CURRENCY_MAP.ETH) {
					calls.push(ctx.provider?.getBalance(walletAddress!));
				} else {
					const tokenContract = new ethers.Contract(address, erc20Abi);
					calls.push(tokenContract.balanceOf(walletAddress));
				}
			}

			const data = (await Promise.all(calls)) as ethers.BigNumber[];

			const balancesMap = zipObject(symbols, data);

			const positiveBalances = omitBy(balancesMap, (entry: ethers.BigNumber) => entry.lte(0));

			return mapValues(positiveBalances, (balance: ethers.BigNumber, symbol: string) => {
				const token = tokensMap[symbol];

				return {
					balance: wei(balance, token.decimals ?? 18),
					token,
				};
			});
		},
		{
			enabled: !!ctx.provider && tokens.length > 0 && !!walletAddress,
			...options,
		}
	);
};

export default useTokensBalancesQuery;
