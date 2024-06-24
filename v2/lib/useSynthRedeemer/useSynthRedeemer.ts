import { useContext, useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { ContractContext } from '@snx-v2/ContractContext';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';
import { SignerContext } from '@snx-v2/SignerContext';
import {
  isSupportedNetworkId,
  NetworkIdByName,
  NetworkNameById,
} from '@snx-v2/useSynthetixContracts';
import { Contract } from '@ethersproject/contracts';
import { wei } from '@synthetixio/wei';
import type { DynamicSynthRedeemer } from '@synthetixio/contracts/build/mainnet/deployment/DynamicSynthRedeemer';
import type { DynamicSynthRedeemer as DynamicSynthRedeemerOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/DynamicSynthRedeemer';
import { initialState, reducer } from '@snx-v2/txnReducer';
import { formatBytes32String } from '@ethersproject/strings';

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/DynamicSynthRedeemer'),
  'mainnet-ovm': () =>
    import('@synthetixio/contracts/build/mainnet-ovm/deployment/DynamicSynthRedeemer'),
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

      const networkName = NetworkNameById[networkId];

      const { address, abi } = await contracts[networkName]();

      return new Contract(address, abi, signer || provider) as
        | DynamicSynthRedeemer
        | DynamicSynthRedeemerOvm;
    },
    staleTime: Infinity,
    enabled: Boolean(networkId),
  });
};

export function useSynthRedeemerActive() {
  const { data: SynthRedeemer } = useSynthRedeemer();
  const { networkId } = useContext(ContractContext);

  return useQuery({
    queryKey: ['useSynthRedeemerActive', { networkId }],
    queryFn: async () => {
      if (!SynthRedeemer || !networkId) throw Error('SynthRedeemer not loaded');

      const isActive = await SynthRedeemer.redemptionActive();
      const discount = await SynthRedeemer.discountRate();

      return {
        isActive,
        discount: wei(discount),
      };
    },
    enabled: Boolean(SynthRedeemer),
  });
}

export function useSynthRedeemerMutation(synthIds?: string[]) {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: SynthRedeemer } = useSynthRedeemer();

  const encodedSynths = synthIds?.map((id) => formatBytes32String(id));

  return {
    ...useMutation(async () => {
      if (!SynthRedeemer || !encodedSynths) return;

      try {
        dispatch({ type: 'prompting' });
        const txn = await SynthRedeemer.redeemAll(encodedSynths);
        dispatch({ type: 'pending', payload: { txnHash: txn.hash } });
        await txn.wait();
        dispatch({ type: 'success' });
      } catch (error: any) {
        dispatch({ type: 'error', payload: { error } });
        throw error;
      }
    }),
    ...txnState,
    settle: () => dispatch({ type: 'settled' }),
  };
}
