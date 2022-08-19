import { Synth } from '@synthetixio/contracts-interface';
import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';
import { loadSynthsByNameFromNetwork } from '../../utils';

const useGetSynthsByName = (
  ctx: QueryContext,
  options?: UseQueryOptions<Partial<Record<string, Synth>>>
) => {
  return useQuery(
    ['synths', ctx.networkId],
    async () => {
      if (!ctx.networkId) throw Error('Expected network id to be defined');
      const { SynthsByName } = await loadSynthsByNameFromNetwork(ctx.networkId);
      return SynthsByName;
    },
    { enabled: Boolean(ctx.networkId), staleTime: 100000, ...options }
  );
};

export default useGetSynthsByName;
