import { ethers } from 'ethers';
import { Issued } from '../../generated/graphql';
import { formatTimestamp } from '../../src/utils';

export const parseDailyIssued = ({
	account,
	block,
	gasPrice,
	id,
	source,
	timestamp,
	value,
}: Issued): Issued => ({
	account,
	block: Number(block),
	gasPrice,
	id,
	source,
	timestamp: formatTimestamp(timestamp),
	value: ethers.utils.formatEther(value),
});
