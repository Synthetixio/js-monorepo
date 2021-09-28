import { DailyBurned } from '../../generated/graphql';

export const parseDailyBurned = ({ id, value, totalDebt }: DailyBurned): DailyBurned => ({
	id,
	value: Number(value),
	totalDebt: Number(totalDebt),
});
