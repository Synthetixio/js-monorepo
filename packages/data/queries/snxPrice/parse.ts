import { DailySnxPrice, FifteenMinuteSnxPrice } from '../../generated/graphql';
import { formatEther } from '../../src/utils';

type SnxPriceSansCount = Omit<DailySnxPrice, 'count'> | Omit<FifteenMinuteSnxPrice, 'count'>;

export const parseSnxPrice = ({ id, averagePrice }: SnxPriceSansCount): SnxPriceSansCount => ({
	id,
	averagePrice: formatEther(averagePrice),
});
