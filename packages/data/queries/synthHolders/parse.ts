import { SynthHolder as UnformattedSynthHolder } from '../../generated/graphql';
import { SynthHolder } from '../../src/types';
import { formatEther } from '../../src/utils';

export const parseSynthHolders = ({
	id,
	synth,
	balanceOf,
}: UnformattedSynthHolder): SynthHolder => ({
	address: id.split('-')[0],
	synth,
	balanceOf: Number(formatEther(balanceOf)),
});
