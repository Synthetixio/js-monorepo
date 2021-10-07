import { RateUpdate } from '../../generated/graphql';
import { formatTimestamp } from '../../src/utils';

export const parseRates = (rate: RateUpdate): RateUpdate => {
	const { block, currencyKey, id, rate: rateValue, synth, timestamp } = rate;

	return {
		block: Number(block),
		currencyKey,
		id,
		rate: Number(rateValue),
		synth,
		timestamp: formatTimestamp(timestamp),
	};
};
