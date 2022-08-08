import { Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';

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
export function isObjKey<T>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj;
}
