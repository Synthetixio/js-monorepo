import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { NetworkIdByName } from '@synthetixio/contracts-interface';
import { Token, TokenListQueryResponse, TokenListResponse } from '../../types';
import { CryptoCurrency, ETH_ADDRESS } from '../../currency';
import { QueryContext } from '../../context';

const ether: Token = {
  address: ETH_ADDRESS,
  chainId: NetworkIdByName.mainnet,
  decimals: 18,
  logoURI: '',
  name: 'Ethereum',
  symbol: CryptoCurrency.ETH,
  tags: [],
};

const useTokenListQuery = (
  _: QueryContext,
  tokenListUrl: string,
  options?: UseQueryOptions<TokenListQueryResponse>
) => {
  return useQuery<TokenListQueryResponse>(
    ['misc', 'tokenList', tokenListUrl],
    async () => {
      const response = await axios.get<TokenListResponse>(tokenListUrl);
      const tokens = [ether, ...response.data.tokens];
      const tokensMap = tokens.reduce((acc: TokenListQueryResponse['tokensMap'], val) => {
        acc[val.symbol] = val;
        return acc;
      }, {});
      return {
        tokens,
        tokensMap,
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
