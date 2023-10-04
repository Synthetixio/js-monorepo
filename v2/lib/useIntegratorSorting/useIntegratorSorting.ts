import { useQuery } from '@tanstack/react-query';

const INTEGRATORS_VOLUME_URL = 'https://synthetix.io/api/integrator';
const ONE_DAY_MS = 1000 * 60 * 60 * 24;

type IntegratorsVolumeResponse = {
  result: {
    integratorForLatestDate: string[];
  };
};

export const useIntegratorSorting = () => {
  return useQuery({
    queryKey: ['useIntegratorSorting'],
    queryFn: async () => {
      const resp: IntegratorsVolumeResponse = await (await fetch(INTEGRATORS_VOLUME_URL)).json();

      return resp.result.integratorForLatestDate.map((integrator: string) =>
        integrator.toLowerCase()
      );
    },
    staleTime: ONE_DAY_MS,
  });
};
