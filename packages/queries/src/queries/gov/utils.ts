import { ethers } from 'ethers';

const {
	providers: { JsonRpcProvider },
} = ethers;

export const getOVMProvider = () => {
	return new JsonRpcProvider('https://mainnet.optimism.io');
};
