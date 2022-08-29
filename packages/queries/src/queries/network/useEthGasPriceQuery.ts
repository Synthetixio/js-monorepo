import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';
import { GasPrices } from '../../types';
import { wei } from '@synthetixio/wei';

import { NetworkIdByName } from '@synthetixio/contracts-interface';
import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';

const MULTIPLIER = wei(2);

export const computeGasFee = (
  baseFeePerGas: BigNumber,
  maxPriorityFeePerGas: number
): {
  maxPriorityFeePerGas: BigNumber;
  maxFeePerGas: BigNumber;
  baseFeePerGas: BigNumber;
} => {
  return {
    maxPriorityFeePerGas: wei(maxPriorityFeePerGas, 9).toBN(),
    maxFeePerGas: wei(baseFeePerGas, 9).mul(MULTIPLIER).add(wei(maxPriorityFeePerGas, 9)).toBN(),
    baseFeePerGas: baseFeePerGas,
  };
};

const getGasPriceFromProvider = async (provider: Provider) => {
  try {
    const gasPrice = await provider.getGasPrice();
    return {
      fastest: { gasPrice },
      fast: { gasPrice },
      average: { gasPrice },
    };
  } catch (e) {
    throw new Error('Could not retrieve gas price from provider');
  }
};

const useEthGasPriceQuery = (ctx: QueryContext, options?: UseQueryOptions<GasPrices, Error>) => {
  return useQuery<GasPrices, Error>(
    ['network', 'gasPrice', ctx.networkId],
    async () => {
      if (!ctx.provider) throw Error('Expected ctx.provider to be defined');
      try {
        // If network is Mainnet then we use EIP1559
        if (ctx.networkId === NetworkIdByName.mainnet) {
          const block = await ctx?.provider?.getBlock('latest');
          if (block?.baseFeePerGas) {
            return {
              fastest: computeGasFee(block.baseFeePerGas, 6),
              fast: computeGasFee(block.baseFeePerGas, 4),
              average: computeGasFee(block.baseFeePerGas, 2),
            };
          } else {
            return getGasPriceFromProvider(ctx.provider);
          }
          // If not (Testnet or Optimism network), we get the Gas Price through the provider
        } else {
          return getGasPriceFromProvider(ctx.provider);
        }
      } catch (e) {
        throw new Error(`Could not fetch and compute network fee. ${e}`);
      }
    },
    {
      enabled: Boolean(ctx.networkId && ctx.provider),
      ...options,
    }
  );
};

export default useEthGasPriceQuery;
