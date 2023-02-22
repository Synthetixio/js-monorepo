import * as wagmi from 'wagmi';

/*
 * Stub methods wrapping wagmi for now
 * TODO: non-wagmi implementation
 * */

export function useProvider() {
  const { data: signer } = wagmi.useSigner();
  const provider = wagmi.useProvider();
  if (signer && signer.provider) {
    return signer.provider;
  }
  return provider;
}

export function useSigner() {
  const { data: signer } = wagmi.useSigner();
  return signer;
}

export function useNetwork() {
  const provider = wagmi.useProvider();
  const [defaultChain] = provider.chains ?? [];

  const network = wagmi.useNetwork();
  return {
    id: network.chain ? network.chain.id : defaultChain.id,
    name: network.chain ? network.chain.network : defaultChain.network,
    isSupported: network.chain ? !network.chain.unsupported : true, // we always support default network
  };
}

export function useAccount(): { address?: string } {
  const account = wagmi.useAccount();
  return {
    address: account.address as string,
  };
}

export function useIsConnected(): boolean {
  const account = wagmi.useAccount();
  return Boolean(account.address);
}
