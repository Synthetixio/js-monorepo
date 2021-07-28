import { ethers } from 'ethers';
import { DailyIssued } from '../../generated/graphql';

export const parseDailyIssued = ({
	id,
	value,
	totalDebt
}: DailyIssued): DailyIssued => ({
	id,
	value: ethers.utils.formatEther(value),
	totalDebt: ethers.utils.formatEther(totalDebt)
});
