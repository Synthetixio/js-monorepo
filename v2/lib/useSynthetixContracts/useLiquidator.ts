import { SynthetixProvider } from '@synthetixio/providers';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { isSupportedNetworkId, NetworkNameById } from './common';
import type { Liquidator } from '@synthetixio/contracts/build/mainnet/deployment/Liquidator';
import type { Liquidator as LiquidatorOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/Liquidator';

type Args =
  | { networkId: number | undefined; signer: ethers.Signer | null }
  | {
      networkId: number | undefined;
      provider: SynthetixProvider | null;
    };

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/Liquidator'),
  'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/Liquidator'),
  goerli: () => import('@synthetixio/contracts/build/goerli/deployment/Liquidator'),
  'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/Liquidator'),
};

export const getLiquidator = async (args: Args) => {
  const { networkId } = args;
  const signerOrProvider = 'signer' in args ? args.signer : args.provider;

  if (!signerOrProvider) throw Error('Provider is missing');
  const supportedNetworkId = isSupportedNetworkId(networkId);
  if (!supportedNetworkId) {
    throw Error(`${networkId} is not supported`);
  }
  const networkName = NetworkNameById[networkId];
  const { address, abi } = await contracts[networkName]();
  const contract = new ethers.Contract(address, abi, signerOrProvider) as
    | Liquidator
    | LiquidatorOvm;
  return contract;
};
export const useLiquidator = (args: Args) => {
  const signerOrProvider = 'signer' in args ? args.signer : args.provider;

  return useQuery([args.networkId, 'useLiquidator'], async () => getLiquidator(args), {
    enabled: Boolean(args.networkId && signerOrProvider),
    staleTime: Infinity,
  });
};
