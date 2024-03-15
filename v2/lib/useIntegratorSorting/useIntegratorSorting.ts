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

      // Temp fix as api is rate limited

      if (
        !resp.result.integratorForLatestDate ||
        resp.result.integratorForLatestDate.length === 0
      ) {
        return defaultOrder;
      }

      return resp.result.integratorForLatestDate.map((integrator: string) =>
        integrator.toLowerCase()
      );
    },
    staleTime: ONE_DAY_MS,
  });
};

const defaultOrder = [
  'kwenta',
  'polynomial',
  'dhedge',
  'lyra',
  'thales',
  'curve',
  'overtime markets',
  'toros',
];
