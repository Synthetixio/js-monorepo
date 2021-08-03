import { ethers } from 'ethers';
import { DailyBurned } from '../../generated/graphql';

export const parseDailyBurned = ({ id, value, totalDebt }: DailyBurned): DailyBurned => ({
	id,
	value: ethers.utils.formatEther(value),
	totalDebt: ethers.utils.formatEther(totalDebt),
});
