import { TotalDailyActiveStaker } from '../../generated/graphql';
import { DailyTotalActiveStakers } from '../../src/types';

export const parseDailyTotalActiveStakers = ({
	id,
	count,
}: TotalDailyActiveStaker): DailyTotalActiveStakers => ({
	id: Number(id),
	count: Number(count),
});
