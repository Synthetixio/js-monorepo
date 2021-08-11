import { RateUpdate } from '../../generated/graphql';
import { formatTimestamp, formatEther } from '../../src/utils';

export const parseRates = (rate: RateUpdate, networkId?: number): RateUpdate => {
	const { block, currencyKey, id, rate: rateValue, synth, timestamp } = rate;

	return {
		block: Number(block),
		currencyKey,
		id,
		rate: formatEther(rateValue),
		synth,
		timestamp: formatTimestamp(timestamp),
	};
};
