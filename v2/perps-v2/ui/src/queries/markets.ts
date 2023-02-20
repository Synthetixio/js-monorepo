import { utils } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { OPTIMISM_GRAPH_URL } from '../utils/constants';
import { perpsV2Contract } from '../utils/contracts';

interface FutureMarketsGraphResponse {
  data: {
    futuresMarkets: { marketKey: string; asset: string; id: string }[];
  };
}

export const useGetMarkets = () =>
  useQuery(['markets'], async () => {
    const response = await fetch(OPTIMISM_GRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query futuresMarkets {
                    futuresMarkets(first: 1000) {
                        marketKey 
                        asset
                        id
                    }
                }`,
      }),
    });
    const { data }: FutureMarketsGraphResponse = await response.json();

    const dataWithMaxLeverage = await Promise.all(
      data.futuresMarkets.map(async (market) => ({
        ...market,
        marketKey: utils.parseBytes32String(market.marketKey),
        asset: utils.parseBytes32String(market.asset),
        maxLeverage: await perpsV2Contract.maxLeverage(market.marketKey),
      }))
    );
    return dataWithMaxLeverage
      .map((data) => ({
        ...data,
        maxLeverage: utils.formatEther(data.maxLeverage),
      }))
      .filter((market) => market.marketKey.includes('PERP'));
  });
