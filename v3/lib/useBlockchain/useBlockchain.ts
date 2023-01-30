import * as wagmi from 'wagmi';

/*
 * Stub methods wrapping wagmi for now
 * TODO: non-wagmi implementation
 * */

export function useProvider() {
  const provider = wagmi.useProvider();
  return provider;
}

export function useSigner() {
  const { data: signer } = wagmi.useSigner();
  return signer;
}

export function useNetwork() {
  const { chain } = wagmi.useNetwork();

  return {
    id: chain?.network,
    name: chain?.name.toLowerCase(),
    isSupported: !chain?.unsupported,
  };
}

export function useAccount(): { address: string } {
  const account = wagmi.useAccount();
  return {
    address: account.address as string,
  };
}

export function useIsConnected(): boolean {
  const account = wagmi.useAccount();
  return Boolean(account.address);
}
