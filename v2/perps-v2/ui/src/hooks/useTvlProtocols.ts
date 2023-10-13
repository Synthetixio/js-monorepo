import { QUERY_KEYS } from '../utils';

import { useQuery } from 'react-query';
import { DuneTvlProtocol, getTvlProtocols } from '../dune/synthetixV3';
import { DuneListResponse } from '../dune/types';
import { format, isAfter, parseISO, subDays } from 'date-fns';

export interface TvlProtocol {
  day: string;
  totalUsd: number;
  label?: string;
  labelType?: 'M' | 'Y' | 'ALL';
  [key: string]: any;
}

export const useTvlProtocols = (queryInterval: 'M' | 'Y' | 'ALL') => {
  const { data, isLoading, error } = useQuery(
    [QUERY_KEYS.GET_TVL_PROTOCOLS],
    () => getTvlProtocols(),
    {
      retry: 0,
    }
  );
  const formattedData = formatData(data, queryInterval);
  const blockchains = getUniqueBlockchains(data?.rows);

  return {
    data: formattedData,
    loading: isLoading,
    error,
    blockchains,
  };
};

function formatData(data?: DuneListResponse<DuneTvlProtocol>, queryInterval?: 'M' | 'Y' | 'ALL') {
  if (typeof data === 'undefined') return data;
  const chartData: TvlProtocol[] = [];
  let startDate: Date;
  const endDate = new Date();
  switch (queryInterval) {
    case 'M':
      startDate = subDays(endDate, 30);
      break;
    case 'Y':
      startDate = subDays(endDate, 365);
      break;
  }

  (queryInterval === 'ALL'
    ? data.rows
    : data.rows.filter((e) => isAfter(parseISO(e.day), startDate))
  ).forEach((stat) => {
    if (!chartData.find((entry) => entry.day === stat.day)) {
      chartData.push({
        day: stat.day,
        totalUsd: stat.total_usd,
        label: format(new Date(parseISO(stat.day)), 'dd/MM'),
        labelType: queryInterval,
      });
    }

    chartData.forEach((entry) => {
      if (entry.day === stat.day) {
        if (entry[stat.blockchain + 'LayerUsd'] === undefined) {
          entry[stat.blockchain + 'LayerUsd'] = stat.layer_usd;
        }
      }
    });
  });

  return chartData.sort((x, y) => (x.day < y.day ? -1 : x.day > y.day ? 1 : 0));
}

function getUniqueBlockchains(data?: DuneTvlProtocol[]): string[] {
  if (!data) return [];
  return data.reduce((uniqueBlockchains: string[], item) => {
    if (!uniqueBlockchains.includes(item.blockchain)) {
      uniqueBlockchains.push(item.blockchain);
    }
    return uniqueBlockchains;
  }, []);
}
