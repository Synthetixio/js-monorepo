import { SynthetixProvider } from '@synthetixio/providers';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { contracts } from './contracts';
import { isSupportedNetworkId, NetworkNameById } from './common';
import type { SystemSettings } from '@synthetixio/contracts/build/mainnet/deployment/SystemSettings';
import type { SystemSettings as SystemSettingsOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/SystemSettings';

type Args =
  | { networkId: number | undefined; signer: ethers.Signer | null }
  | {
      networkId: number | undefined;
      provider: SynthetixProvider | null;
    };

export const getSystemSettings = async (args: Args) => {
  const { networkId } = args;
  const signerOrProvider = 'signer' in args ? args.signer : args.provider;

  if (!signerOrProvider) throw Error('Provider is missing');
  const supportedNetworkId = isSupportedNetworkId(networkId);
  if (!supportedNetworkId) {
    throw Error(`${networkId} is not supported`);
  }
  const networkName = NetworkNameById[networkId];
  const { address, abi } = await contracts['SystemSettings'][networkName]();
  const contract = new ethers.Contract(address, abi, signerOrProvider) as
    | SystemSettings
    | SystemSettingsOvm;
  return contract;
};
export const useSystemSettings = (args: Args) => {
  return useQuery([args.networkId, 'useSystemSettings'], () => getSystemSettings(args));
};
