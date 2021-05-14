import { RateUpdate } from '../../generated/graphql';
import { formatTimestamp } from '../../src/utils';

export const parseRates = ({
	block,
	currencyKey,
	id,
	rate,
	synth,
	timestamp,
}: RateUpdate): RateUpdate => ({
	block: Number(block),
	currencyKey,
	id,
	rate: rate,
	synth,
	timestamp: formatTimestamp(timestamp),
});
