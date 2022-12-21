import { Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { NetworkId, NetworkIdByName } from '@synthetixio/contracts-interface';

export const formatGwei = (wei: number) => wei / 1e8 / 10;

export const getProxySynthSymbol = (provider: Provider, address: string) => {
  const c = new Contract(
    address,
    [
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ],
    provider
  );
  return c.symbol();
};
export function isObjKey<T extends Record<string, unknown>>(
  key: PropertyKey,
  obj: T
): key is keyof T {
  return key in obj;
}
export function notNill<Value>(value: Value | null | undefined): value is Value {
  return value !== null && value !== undefined;
}
export const loadSynthsByNameFromNetwork = (networkId: NetworkId) => {
  switch (networkId) {
    case NetworkIdByName['mainnet']:
      return import('@synthetixio/contracts/build/mainnet/synths');
    case NetworkIdByName['mainnet-ovm']:
      return import('@synthetixio/contracts/build/mainnet-ovm/synths');
    case NetworkIdByName['goerli']:
      return import('@synthetixio/contracts/build/goerli/synths');
    case NetworkIdByName['goerli-ovm']:
      return import('@synthetixio/contracts/build/goerli-ovm/synths');
    default:
      return import('@synthetixio/contracts/build/mainnet/synths');
  }
};
