import { wei } from '@synthetixio/wei';
import { SynthBalance } from '../../generated/graphql';
import { formatTimestamp } from '../../src/utils';

export const parseSynthBalance = ({
	id,
	account,
	amount,
	synth,
	timestamp,
}: SynthBalance): SynthBalance => ({
	id,
	amount: wei(amount, 18, true).toString(),
	account,
	synth,
	timestamp: formatTimestamp(timestamp),
});
