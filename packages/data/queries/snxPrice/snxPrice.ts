import { gql } from 'graphql-request';
import { SnxPriceParams } from '../../src/types';
import { timeSeriesEntityMap } from '../../src/constants';
import { createGQLWhereString, createGQLBlockNumberString } from '../../src/utils';

export const createSnxPriceQuery = (params: SnxPriceParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			id_lt:
				(params?.autoGeneratedPaginationField ?? null) != null
					? 'autoGeneratedPaginationField'
					: null,
		})
	);
	return gql`
	query snxPrices($autoGeneratedPaginationField: Int, $max: Int, $timeSeries: String) {
		${timeSeriesEntityMap[params.timeSeries]}(
			first: $max${createGQLBlockNumberString(params?.blockNumber ?? null)}
			where: ${whereString}
			orderBy: id
			orderDirection: desc
		) {
			id
			averagePrice
		}
	}`;
};
