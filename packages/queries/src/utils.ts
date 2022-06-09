import { ethers } from 'ethers';

export const formatGwei = (wei: number) => wei / 1e8 / 10;

export const getProxySynthSymbol = (provider: ethers.providers.Provider, address: string) => {
	const c = new ethers.Contract(
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
