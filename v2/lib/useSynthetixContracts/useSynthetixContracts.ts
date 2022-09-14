import { SynthetixProvider } from '@synthetixio/providers';
import { ethers } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { contracts } from './contracts';

export const NetworkIdByName = {
  mainnet: 1,
  goerli: 5,
  'goerli-ovm': 420,
  'mainnet-ovm': 10,
} as const;

export const NetworkNameById = {
  1: 'mainnet',
  5: 'goerli',
  10: 'mainnet-ovm',
  420: 'goerli-ovm',
} as const;
export type NetworkId = typeof NetworkIdByName[keyof typeof NetworkIdByName];

function isSupportedNetworkId(id: number | string): id is NetworkId {
  return id in NetworkNameById;
}

type ContractName = Array<keyof typeof contracts>;
type Args =
  | { networkId: number | undefined; contractNames: ContractName; signer: ethers.Signer | null }
  | {
      networkId: number | undefined;
      contractNames: ContractName;
      provider: SynthetixProvider | null;
    };
export function useGetSynthetixContracts(args: Args) {
  const { networkId, contractNames } = args;
  const signerOrProvider = 'signer' in args ? args.signer : args.provider;

  return useQuery(
    [contractNames, networkId],
    async () => {
      if (!networkId) throw Error('query should not be enabled when networkId is missing');
      if (!signerOrProvider) {
        throw Error('query should not be enabled when signer and Provider is missing');
      }
      const supportedNetworkId = isSupportedNetworkId(networkId);
      if (!supportedNetworkId) {
        throw Error(`${networkId} is not supported`);
      }
      const networkName = NetworkNameById[networkId];

      const contractsData = await Promise.all(
        contractNames.map((contractName) => {
          const contract = contracts[contractName][networkName]();
          return contract;
        })
      );
      return contractsData.map(
        ({ address, abi }) => new ethers.Contract(address, abi, signerOrProvider)
      );
    },
    { enabled: Boolean(networkId && signerOrProvider), staleTime: Infinity }
  );
}
