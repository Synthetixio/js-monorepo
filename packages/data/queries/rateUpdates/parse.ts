import { ethers } from 'ethers';
import { NetworkId } from '@synthetixio/contracts-interface';

import { RateUpdate } from '../../generated/graphql';
import { formatTimestamp } from '../../src/utils';

export const parseRates = (rate: RateUpdate, networkId?: number): RateUpdate => {
	const { block, currencyKey, id, rate: rateValue, synth, timestamp } = rate;
	let parsedRate: string = '';
	try {
		parsedRate = ethers.utils.formatEther(rateValue).toString();
	} catch {
		parsedRate = rateValue.toString();
	}

	return {
		block: Number(block),
		currencyKey,
		id,
		rate: parsedRate,
		synth,
		timestamp: formatTimestamp(timestamp),
	};
};
