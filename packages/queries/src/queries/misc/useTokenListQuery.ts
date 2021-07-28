import { useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import keyBy from 'lodash/keyBy';

import { TokenListQueryResponse, TokenListResponse } from '../../types';
import { CryptoCurrency, ETH_ADDRESS } from '../../currency';
import { QueryContext } from '../../context';

const ether = {
	address: ETH_ADDRESS,
	chainId: 1,
	decimals: 18,
	logoURI: '',
	name: 'Ethereum',
	symbol: CryptoCurrency.ETH,
	tags: [],
};

const useTokenListQuery = (_: QueryContext, tokenListUrl: string, options?: UseQueryOptions<TokenListQueryResponse>) => {
	return useQuery<TokenListQueryResponse>(
		['misc', 'tokenList', tokenListUrl],
		async () => {
			const response = await axios.get<TokenListResponse>(tokenListUrl);

			const tokens = [ether, ...response.data.tokens];

			return {
				tokens,
				tokensMap: keyBy(tokens, 'symbol'),
				symbols: tokens.map((token) => token.symbol),
			};
		},
		{
			refetchInterval: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			...options,
		}
	);
};

export default useTokenListQuery;
