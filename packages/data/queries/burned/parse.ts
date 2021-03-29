import { ethers } from 'ethers';
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
	gasPrice,
	id,
	source,
	timestamp: formatTimestamp(timestamp),
	value: ethers.utils.formatEther(value),
});
