import { z } from 'zod';
import { ReactNode, useEffect } from 'react';
import { isStaging } from './isStaging';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { MarketsByKey } from '../types';

export const pyth = new EvmPriceServiceConnection('https://xc-mainnet.pyth.network');

const OffchainFeedSchema = z.array(
  z.object({
    kind: z.literal('pyth'),
    oracle: z.string(),
    asset: z.string(),
    feedId: z.string(),
  })
);

export type PythConfigByMarketKey = Record<
  string,
  {
    key: string;
    pythId: string;
    asset: string;
  }
>;

const formatAssetToPerpName = (x: string) => {
  if (x === 'sETH' || x === 'sBTC') {
    return `${x}PERP`;
  }
  return `s${x}PERP`;
};

export const getMarketsPythConfig = () => {
  const network = isStaging ? 'goerli-ovm' : 'mainnet-ovm';
  const url = `https://raw.githubusercontent.com/Synthetixio/synthetix/master/publish/deployed/${network}/offchain-feeds.json`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const parsedJson = OffchainFeedSchema.parse(json);
      return parsedJson
        .map(({ feedId, asset }) => {
          const key = formatAssetToPerpName(asset);
          return {
            key,
            pythId: feedId,
            asset,
          };
        })
        .reduce((acc: MarketsByKey, val) => {
          acc[val.key] = val;
          return acc;
        }, {});
    });
};

export interface PythPrice {
  price: string;
  conf: string;
  expo: number;
  publishTime: number;
}

export const prices: { [key: string]: PythPrice } = {};

export const PythRealtimePrices = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    (async () => {
      const pythConfigByMarketKey = await getMarketsPythConfig();
      const pythIds = Object.values(pythConfigByMarketKey).map((x) => x.pythId);
      await pyth.subscribePriceFeedUpdates(pythIds, (price) => {
        const { id } = price;
        const priceData = price.getPriceUnchecked();

        if (priceData) {
          prices[id] = priceData;
        }
      });
    })();

    return () => {
      // Clean up WebSocket connection when the component unmounts
      (() => {
        pyth.unsubscribePriceFeedUpdates(Object.keys(prices));
      })();
    };
  }, []);

  return <>{children}</>;
};
