import { ethers } from 'ethers';
import { RateUpdate } from '../../generated/graphql';
import { formatTimestamp } from '../../src/utils';
import { NetworkId } from '@synthetixio/contracts-interface';

export const parseRates = (rate: RateUpdate, networkId?: number): RateUpdate => {
	const { block, currencyKey, id, rate: rateValue, synth, timestamp } = rate;
	const parsedRate =
		networkId && networkId === NetworkId['Kovan-Ovm']
			? rateValue
			: ethers.utils.formatEther(rateValue);

	return {
		block: Number(block),
		currencyKey,
		id,
		rate: parsedRate,
		synth,
		timestamp: formatTimestamp(timestamp),
	};
};
