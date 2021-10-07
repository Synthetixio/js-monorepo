import { DailySnxPrice, FifteenMinuteSnxPrice } from '../../generated/graphql';

type SnxPriceSansCount = Omit<DailySnxPrice, 'count'> | Omit<FifteenMinuteSnxPrice, 'count'>;

export const parseSnxPrice = ({ id, averagePrice }: SnxPriceSansCount): SnxPriceSansCount => ({
	id,
	averagePrice: Number(averagePrice),
});
