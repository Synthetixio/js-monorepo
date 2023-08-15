import { useQuery } from '@tanstack/react-query';

const INTEGRATORS_VOLUME_URL = 'https://api.dune.com/api/v1/query/2647536/results';
const apiKey = process?.env?.NEXT_PUBLIC_DUNE_API_KEY || '';
const ONE_DAY_MS = 1000 * 60 * 60 * 24;

type IntegratorsVolumeResponse = {
  result: {
    rows: {
      daily_fee: number;
      day: string;
      integrator_cum_fee: number;
      tracking_code: string | null;
    }[];
  };
};

export const useIntegratorSorting = () => {
  return useQuery({
    queryKey: ['useIntegratorSorting'],
    queryFn: async () => {
      const resp = await fetch(INTEGRATORS_VOLUME_URL, {
        headers: { 'x-dune-api-key': apiKey },
      });
      const json: IntegratorsVolumeResponse = await resp.json();
      const integratorsVolume = json.result.rows.sort((a, b) => (b.day > a.day ? 1 : -1));

      // Get the integrator volume for the latest date
      // and sort by daily fee
      return integratorsVolume
        .filter((item) => item.day === integratorsVolume[0].day)
        .sort((a, b) => (a.daily_fee > b.daily_fee ? -1 : 1))
        .map((item) => item.tracking_code?.split('\x00')[0].toLowerCase() || '');
    },
    staleTime: ONE_DAY_MS,
  });
};
