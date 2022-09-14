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

type ContractName = Array<keyof typeof contracts>;
type Args =
  | { networkId: NetworkId; contractNames: ContractName; signer: ethers.Signer }
  | {
      networkId: NetworkId;
      contractNames: ContractName;
      provider: SynthetixProvider;
    };
export function useGetSynthetixContracts(args: Args) {
  const { networkId, contractNames } = args;
  const signerOrProvider = 'signer' in args ? args.signer : args.provider;
  const networkName = NetworkNameById[networkId];

  return useQuery(
    [contractNames, networkName, networkId],
    async () => {
      const contractsData = await Promise.all(
        contractNames.map((contractName) => contracts[contractName][networkName]())
      );
      return contractsData.map(
        ({ address, abi }) => new ethers.Contract(address, abi, signerOrProvider)
      );
    },
    { enabled: Boolean(networkId), staleTime: Infinity }
  );
}
