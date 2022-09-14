import { SynthetixProvider } from '@synthetixio/providers';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { contracts } from './contracts';
import { isSupportedNetworkId, NetworkNameById } from './common';
import type { Synthetix } from '@synthetixio/contracts/build/mainnet/deployment/Synthetix';
import type { Synthetix as SynthetixOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/Synthetix';

type Args =
  | { networkId: number | undefined; signer: ethers.Signer | null }
  | {
      networkId: number | undefined;
      provider: SynthetixProvider | null;
    };

export const getSynthetix = async (args: Args) => {
  const { networkId } = args;
  const signerOrProvider = 'signer' in args ? args.signer : args.provider;

  if (!signerOrProvider) throw Error('Provider is missing');
  const supportedNetworkId = isSupportedNetworkId(networkId);
  if (!supportedNetworkId) {
    throw Error(`${networkId} is not supported`);
  }
  const networkName = NetworkNameById[networkId];
  const { address, abi } = await contracts['Synthetix'][networkName]();
  const contract = new ethers.Contract(address, abi, signerOrProvider) as SynthetixOvm | Synthetix;
  return contract;
};
export const useSynthetix = (args: Args) => {
  return useQuery([args.networkId, 'useSynthetix'], () => getSynthetix(args));
};
