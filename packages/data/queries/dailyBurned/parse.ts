import { DailyBurned } from '../../generated/graphql';
import { formatEther } from '../../src/utils';

export const parseDailyBurned = ({ id, value, totalDebt }: DailyBurned): DailyBurned => ({
	id,
	value: formatEther(value),
	totalDebt: formatEther(totalDebt),
});
