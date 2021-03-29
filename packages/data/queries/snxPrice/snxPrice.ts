import { gql } from 'graphql-request';
import { SnxPriceParams } from '../../src/types';
import { timeSeriesEntityMap } from '../../src/constants';

export const createSnxPriceQuery = ({ timeSeries }: SnxPriceParams): string => gql`
	query snxPrices($minBlock: Int, $max: Int, $account: String) {
		${timeSeriesEntityMap[timeSeries]}(
			first: $max
			orderBy: id
			orderDirection: desc
		) {
			id
			averagePrice
		}
	}`;
