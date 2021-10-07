import { FeesClaimed } from '../../generated/graphql';
import { formatTimestamp } from '../../src/utils';

export const parseFeesClaimed = ({
	account,
	block,
	id,
	rewards,
	timestamp,
	value,
}: FeesClaimed): FeesClaimed => ({
	account,
	block: Number(block),
	id,
	timestamp: formatTimestamp(timestamp),
	value: Number(value),
	rewards: Number(rewards),
});
