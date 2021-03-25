import { gql } from 'graphql-request';
import { RateUpdateQueryParams } from '../../src/types';
import { createGQLWhereString } from '../../src/utils';

export const createRateUpdatesQuery = ({ synth, minTimestamp }: RateUpdateQueryParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			synth: synth != null ? 'synth' : null,
			timestamp_gte: minTimestamp != null ? 'minTimestamp' : null,
		})
	);

	return gql`
		query rateUpdates($max: Int, $synth: String, $minTimestamp: Int) {
			rateUpdates(
				first: $max
				where: ${whereString}
				orderBy: timestamp
				orderDirection: desc
			) {
				id
				currencyKey
				synth
				rate
				block
				timestamp
			}
		}
	`;
};
