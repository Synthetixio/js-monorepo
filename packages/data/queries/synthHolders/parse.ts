import { SynthHolder as UnformattedSynthHolder } from '../../generated/graphql';
import { SynthHolder } from '../../src/types';

export const parseSynthHolders = ({
	id,
	synth,
	balanceOf,
}: UnformattedSynthHolder): SynthHolder => ({
	address: id.split('-')[0],
	synth,
	balanceOf: Number(balanceOf),
});
