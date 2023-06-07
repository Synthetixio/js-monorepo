import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { wei } from '@synthetixio/wei';
import { Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractContext } from '@snx-v2/ContractContext';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { GWEI_DECIMALS } from '@snx-v2/Constants';
import { useGlobalProvidersWithFallback } from '@snx-v2/useGlobalProvidersWithFallback';
import { SignerContext } from '@snx-v2/SignerContext';

const MULTIPLIER = wei(2, GWEI_DECIMALS);

export const computeGasFee = (baseFeePerGas: BigNumber, maxPriorityFeePerGas: number) => {
  return {
    maxPriorityFeePerGas: wei(maxPriorityFeePerGas, GWEI_DECIMALS).toBN(),
    maxFeePerGas: wei(baseFeePerGas, GWEI_DECIMALS)
      .mul(MULTIPLIER)
      .add(wei(maxPriorityFeePerGas, GWEI_DECIMALS))
      .toBN(),
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

export const useGasPrice = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);
  const { globalProviders } = useGlobalProvidersWithFallback();

  return useQuery({
    queryKey: ['useGasPrice', { networkId, walletAddress }],
    queryFn: async () => {
      if (!networkId) throw Error('Network id required');
      const globalProvider =
        networkId === NetworkIdByName.mainnet ? globalProviders.mainnet : globalProviders.optimism;
      const provider = signer?.provider || globalProvider;
      try {
        const block = await provider.getBlock('latest');
        if (block.baseFeePerGas) {
          return {
            fastest: computeGasFee(block.baseFeePerGas, 6),
            fast: computeGasFee(block.baseFeePerGas, 4),
            average: computeGasFee(block.baseFeePerGas, 2),
          };
        }

        // When Testnet, Optimism network or missing baseFeePerGas we get the Gas Price through the provider
        return getGasPriceFromProvider(provider);
      } catch (e) {
        throw new Error(`Could not fetch and compute network fee. ${e}`);
      }
    },
    enabled: Boolean(networkId),
  });
};
