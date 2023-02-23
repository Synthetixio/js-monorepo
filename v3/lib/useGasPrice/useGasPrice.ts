import { useQuery } from '@tanstack/react-query';
import { wei } from '@synthetixio/wei';
import { InfuraProvider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { GWEI_DECIMALS } from '@snx-v3/constants';
import { useNetwork } from '@snx-v3/useBlockchain';

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

export const getGasPrice = async ({
  networkName,
  networkId,
}: {
  networkName: string;
  networkId: number;
}) => {
  const provider = new InfuraProvider(networkId, process.env.NEXT_PUBLIC_INFURA_PROJECT_ID);

  try {
    // If network is Mainnet then we use EIP1559
    if (networkName === 'mainnet') {
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
};
export type GasPrices = Awaited<ReturnType<typeof getGasPrice>>;

export const useGasPrice = () => {
  const network = useNetwork();

  return useQuery({
    queryKey: [network.name, 'GasPrice'],
    queryFn: async () => {
      return getGasPrice({ networkId: network.id, networkName: network.name });
    },

    enabled: Boolean(network.name && network.id),
  });
};
