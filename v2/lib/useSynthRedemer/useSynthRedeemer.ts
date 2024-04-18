import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';
import { ContractContext } from '@snx-v2/ContractContext';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';
import { SignerContext } from '@snx-v2/SignerContext';
import {
  isSupportedNetworkId,
  NetworkIdByName,
  NetworkNameById,
} from '@snx-v2/useSynthetixContracts';
import { Contract } from '@ethersproject/contracts';
import type { DynamicSynthRedeemer } from '@synthetixio/contracts/build/sepolia/deployment/DynamicSynthRedeemer';
import type { DynamicSynthRedeemer as DynamicSynthRedeemerOvm } from '@synthetixio/contracts/build/sepolia-ovm/deployment/DynamicSynthRedeemer';

// TODO: Update for mainnet
const contracts = {
  sepolia: () => import('@synthetixio/contracts/build/sepolia/deployment/DynamicSynthRedeemer'),
  'sepolia-ovm': () =>
    import('@synthetixio/contracts/build/sepolia-ovm/deployment/DynamicSynthRedeemer'),
};

export const useSynthRedeemer = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);
  const { globalProviders } = useGlobalProvidersWithFallback();

  return useQuery({
    // We add walletAddress as a query key to make sure the signer is up to date, we cant use signer directly since it cant be stringified
    // This contract doesn't have any mutative functions, but for consistency I think it make sense to keep it consistent
    queryKey: ['useSynthRedeemer', { networkId, walletAddress }],
    queryFn: async () => {
      if (!networkId) throw Error('Network id required');

      const globalProvider =
        networkId === NetworkIdByName.mainnet ? globalProviders.mainnet : globalProviders.optimism;
      const provider = signer?.provider || globalProvider;

      const supportedNetworkId = isSupportedNetworkId(networkId);

      if (!supportedNetworkId) {
        throw Error(`${networkId} is not supported`);
      }

      const networkName = (NetworkNameById[networkId] as 'sepolia-ovm') || 'sepolia';

      const { address, abi } = await contracts[networkName]();

      return new Contract(address, abi, signer || provider) as
        | DynamicSynthRedeemer
        | DynamicSynthRedeemerOvm;
    },
    staleTime: Infinity,
    enabled: Boolean(networkId),
  });
};

export const useSynthRedeemerMutation = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const { delegateWallet } = useDelegateWallet();
  const { data: SynthRedeemer } = useSynthRedeemer();

  const walletAddressToUse = delegateWallet?.address || walletAddress;

  return useQuery(
    ['useSynthRedeemerMutation', { networkId, walletAddressToUse }],
    async () => {
      return true;
    },
    {
      enabled: Boolean(networkId && walletAddressToUse && SynthRedeemer),
    }
  );
};
