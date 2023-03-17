import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BigNumber, Contract, providers } from 'ethers';
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

interface PositionsData {
  address: string | undefined;
  entryPrice: string;
  lastPrice: string;
  leverage: string;
  pnl: string;
  margin: string;
  size: string;
  long: boolean;
  liquidationPrice: string;
  asset: string;
  funding: string;
  notionalValue: string;
  skew: string;
  skewScale: string;
}

interface PositionsState {
  loading: boolean;
  data: PositionsData[];
}

export const usePositions = (walletAddress?: string) => {
  const [state, setState] = useState<PositionsState>({ loading: true, data: [] });

  // Initial query to give a list of markets
  const { loading, data, error } = useQuery(POSITIONS_QUERY_MARKET, {
    variables: {
      where: { isOpen: true, account: walletAddress },
      orderBy: FuturesPosition_OrderBy.Size,
      orderDirection: OrderDirection.Desc,
      first: 50,
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    if (data && data?.futuresPositions.length > 0) {
      (async () => {
        const update: PositionsData[] = [];
        const markets = data?.futuresPositions.map((item) => {
          return {
            market: item.market.marketKey,
            asset: item.market.asset,
            entryPrice: item.entryPrice,
            leverage: item.leverage,
          };
        });
        const positionsData = await fetchPositions(markets, walletAddress || '');

        positionsData.forEach(({ position, entryPrice, leverage, asset, skew, skewScale }) => {
          const {
            accessibleMargin,
            liquidationPrice,
            accruedFunding,
            profitLoss,
            position: { lastPrice, size },
            notionalValue,
          } = position;

          const isLong = !size.toString().includes('-');

          update.push({
            address: walletAddress,
            asset,
            lastPrice: lastPrice.toString(),
            liquidationPrice: liquidationPrice.toString(),
            pnl: profitLoss.toString(),
            margin: accessibleMargin.toString(),
            size: size.toString(),
            long: isLong,
            entryPrice,
            leverage,
            funding: accruedFunding.toString(),
            notionalValue: notionalValue.toString(),
            skew: skew.toString(),
            skewScale: skewScale.toString(),
          });
        });

        setState({ loading: false, data: update });
      })();

      const id = setInterval(() => {
        (async () => {
          const update: PositionsData[] = [];
          const markets = data?.futuresPositions.map((item) => {
            return {
              market: item.market.marketKey,
              asset: item.market.asset,
              entryPrice: item.entryPrice,
              leverage: item.leverage,
              id: item.id,
            };
          });

          const ids = data.futuresPositions.map(({ id }) => id);
          console.log(
            `Polling ${ids.length} position${ids.length === 1 ? '' : 's'}:`,
            ids.join(' ')
          );
          if (ids.length === 0) return;

          const positionsData = await fetchPositions(markets, walletAddress || '');
          positionsData.forEach(({ asset, position, entryPrice, leverage, skew, skewScale }) => {
            const {
              accessibleMargin,
              liquidationPrice,
              accruedFunding,
              profitLoss,
              position: { lastPrice, size },
              notionalValue,
            } = position;
            const isLong = !size.toString().includes('-');

            update.push({
              address: walletAddress,
              asset,
              lastPrice: lastPrice.toString(),
              liquidationPrice: liquidationPrice.toString(),
              pnl: profitLoss.toString(),
              margin: accessibleMargin.toString(),
              size: size.toString(),
              long: isLong,
              entryPrice,
              leverage,
              funding: accruedFunding.toString(),
              notionalValue: notionalValue.toString(),
              skew: skew.toString(),
              skewScale: skewScale.toString(),
            });
          });
        })();
      }, 5000);

      return () => clearInterval(id);
    } else if (!loading && data) {
      setState({ loading: false, data: [] });
    }
  }, [data, loading, walletAddress]);

  return { ...state, error };
};

interface PositionData {
  market: string;
  asset: string;
  entryPrice: string;
  leverage: string;
}

interface DataResponse {
  market: string;
  asset: string;
  entryPrice: string;
  leverage: string;
  position: PerpsV2MarketData.PositionDataStructOutput;
  skew: BigNumber;
  skewScale: BigNumber;
}

async function fetchPositions(positionData: PositionData[], address: string) {
  const data: DataResponse[] = [];

  await Promise.all(
    positionData.map(async ({ entryPrice, leverage, market, asset }) => {
      const positionData = await contract.positionDetailsForMarketKey(market, address);
      const { fundingParameters, marketSizeDetails } = await contract.marketDetailsForKey(market);

      data.push({
        position: positionData,
        market,
        leverage,
        entryPrice,
        asset,
        skew: marketSizeDetails.marketSkew,
        skewScale: fundingParameters.skewScale,
      });
    })
  );

  return data;
}
