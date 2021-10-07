import { DailyIssued } from '../../generated/graphql';

export const parseDailyIssued = ({ id, value, totalDebt }: DailyIssued): DailyIssued => ({
	id,
	value: Number(value),
	totalDebt: Number(totalDebt),
});
