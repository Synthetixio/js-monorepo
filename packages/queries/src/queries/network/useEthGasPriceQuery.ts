import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';
import { GasPrices } from '../../types';
import { formatGwei } from '../../utils';
import Wei, { wei } from '@synthetixio/wei';

import { NetworkId } from '@synthetixio/contracts-interface';
import { ethers } from 'ethers';

const MULTIPLIER = wei(2);

const computeGasFee = (baseFeePerGas: Wei, maxPriorityFeePerGas: Wei) => {
	return {
		maxPriorityFeePerGas: maxPriorityFeePerGas,
		maxFeePerGas: baseFeePerGas.mul(MULTIPLIER).add(maxPriorityFeePerGas),
	};
};

const getGasPriceFromProvider = async (provider: ethers.providers.Provider) => {
	const gasPrice = wei(await provider.getGasPrice());
	return {
		fastest: { gasPrice },
		fast: { gasPrice },
		average: { gasPrice },
	};
};

const useEthGasPriceQuery = (ctx: QueryContext, options?: UseQueryOptions<GasPrices, Error>) => {
	return useQuery<GasPrices, Error>(
		['network', 'gasPrice', ctx.networkId],
		async () => {
			try {
				// If network is Mainnet then we use EIP1559
				if (ctx.networkId === NetworkId.Mainnet) {
					const block = await ctx?.provider?.getBlock('latest');
					if (block?.baseFeePerGas) {
						return {
							fastest: computeGasFee(wei(block.baseFeePerGas), wei(6, 9)),
							fast: computeGasFee(wei(block.baseFeePerGas), wei(4, 9)),
							average: computeGasFee(wei(block.baseFeePerGas), wei(2, 9)),
						};
					} else return getGasPriceFromProvider(ctx.provider!);
					// If not (Testnet or Optimism network), we get the Gas Price through the provider
				} else {
					return getGasPriceFromProvider(ctx.provider!);
				}
			} catch (e) {
				throw new Error(`Could not fetch and compute network fee. ${e}`);
			}
		},
		{
			enabled: !!ctx.networkId,
			...options,
		}
	);
};

export default useEthGasPriceQuery;
