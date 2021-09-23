import { DailyIssued } from '../../generated/graphql';
import { formatEther } from '../../src/utils';

export const parseDailyIssued = ({ id, value, totalDebt }: DailyIssued): DailyIssued => ({
	id,
	value: formatEther(value),
	totalDebt: formatEther(totalDebt),
});
