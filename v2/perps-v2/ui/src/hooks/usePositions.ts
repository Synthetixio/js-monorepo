import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { utils, Contract, providers } from 'ethers';
import { POSITIONS_QUERY_MARKET } from '../queries/positions';
import { infuraId } from '../utils';
import { FuturesPosition_OrderBy, OrderDirection } from '../__generated__/graphql';
import {
  abi,
  address,
  PerpsV2MarketData,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/PerpsV2MarketData';

const provider = new providers.InfuraProvider(10, infuraId);

const contract = new Contract(address, abi, provider) as PerpsV2MarketData;

export const usePositions = (walletAddress?: string) => {
  const [state, setState] = useState(null);

  // Initial query to give a list of markets
  const { loading, data } = useQuery(POSITIONS_QUERY_MARKET, {
    variables: {
      where: { isOpen: true, account: walletAddress },
      orderBy: FuturesPosition_OrderBy.Size,
      orderDirection: OrderDirection.Desc,
      first: 50,
    },
  });

  useEffect(() => {
    if (data && data?.futuresPositions.length > 0) {
      (async () => {
        const markets = data?.futuresPositions.map((item) => item.market.marketKey);
        const positionsData = await fetchPositions(markets, walletAddress || '');
        console.log('positions data', positionsData);
      })();

      const id = setInterval(() => {
        (async () => {
          const markets = data?.futuresPositions.map((item) => item.market.marketKey);
          const positionsData = await fetchPositions(markets, walletAddress || '');
          console.log('positions data update', positionsData);
        })();
      }, 10000);

      return () => clearInterval(id);
    } else if (!loading && data) {
      console.log('No one at home');
    }
  }, [data, loading, walletAddress]);

  return { loading, data };
};

async function fetchPositions(markets: string[], address: string) {
  const data: PerpsV2MarketData.PositionDataStructOutput[] = [];

  await Promise.all(
    markets.map(async (market) => {
      const positionData = await contract.positionDetailsForMarketKey(market, address);
      data.push(positionData);
    })
  );

  return data;
}
