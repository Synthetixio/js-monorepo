import { Issued } from '../../generated/graphql';
import { formatTimestamp, formatEther } from '../../src/utils';

export const parseIssued = ({
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
	value: formatEther(value),
});
