import { z } from 'zod';
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
