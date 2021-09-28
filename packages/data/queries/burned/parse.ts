import { Burned } from '../../generated/graphql';
import { formatTimestamp } from '../../src/utils';

export const parseBurned = ({
	account,
	block,
	gasPrice,
	id,
	source,
	timestamp,
	value,
}: Burned): Burned => ({
	account,
	block: Number(block),
	gasPrice: Number(gasPrice),
	id,
	source,
	timestamp: formatTimestamp(timestamp),
	value: Number(value),
});
