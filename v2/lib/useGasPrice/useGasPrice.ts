import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { wei } from '@synthetixio/wei';
import { InfuraProvider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractContext } from '@snx-v2/ContractContext';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { GWEI_DECIMALS } from '@snx-v2/Constants';

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

const getGasPriceFromProvider = async (provider: InfuraProvider) => {
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
  const { networkId } = useContext(ContractContext);

  return useQuery(
    ['useGasPrice', networkId],
    async () => {
      if (!networkId) throw Error('Network id required');
      const provider = new InfuraProvider(networkId, process.env.NEXT_PUBLIC_INFURA_PROJECT_ID);
      try {
        // If network is Mainnet then we use EIP1559
        if (networkId === NetworkIdByName.mainnet) {
          const block = await provider.getBlock('latest');
          if (block.baseFeePerGas) {
            return {
              fastest: computeGasFee(block.baseFeePerGas, 6),
              fast: computeGasFee(block.baseFeePerGas, 4),
              average: computeGasFee(block.baseFeePerGas, 2),
            };
          }
        }
        // When Testnet, Optimism network or missing baseFeePerGas we get the Gas Price through the provider
        return getGasPriceFromProvider(provider);
      } catch (e) {
        throw new Error(`Could not fetch and compute network fee. ${e}`);
      }
    },
    {
      enabled: Boolean(networkId),
    }
  );
};
