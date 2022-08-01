import { JsonRpcProvider } from '@ethersproject/providers';

export const getOVMProvider = () => {
	return new JsonRpcProvider('https://mainnet.optimism.io');
};
