import { SynthetixProvider } from '@synthetixio/providers';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { contracts } from './contracts';
import { isSupportedNetworkId, NetworkNameById } from './common';
import type { Liquidator } from '@synthetixio/contracts/build/mainnet/deployment/Liquidator';
import type { Liquidator as LiquidatorOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/Liquidator';

type Args =
  | { networkId: number | undefined; signer: ethers.Signer | null }
  | {
      networkId: number | undefined;
      provider: SynthetixProvider | null;
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
  const { address, abi } = await contracts['Liquidator'][networkName]();
  const contract = new ethers.Contract(address, abi, signerOrProvider) as
    | Liquidator
    | LiquidatorOvm;
  return contract;
};
export const useLiquidator = (args: Args) => {
  return useQuery([args.networkId, 'useLiquidator'], async () => getLiquidator(args));
};
