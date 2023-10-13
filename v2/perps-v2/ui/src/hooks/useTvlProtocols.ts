import { QUERY_KEYS } from '../utils';

import { useQuery } from 'react-query';
import { format, isAfter, parseISO, subDays } from 'date-fns';
import { getTVLs } from '../api/synthetixV3';
import { DuneTvlProtocol } from '../api/types';

export interface TvlProtocol {
  day: string;
  totalUsd: number;
  label?: string;
  labelType?: 'M' | 'Y' | 'ALL';
  [blockchain: string]: any;
}

export const useTvlProtocols = (queryInterval: 'M' | 'Y' | 'ALL') => {
  const { data, isLoading, error } = useQuery([QUERY_KEYS.GET_TVL], () => getTVLs(), {
    retry: 0,
  });
  const formattedData = formatData(data?.tvlByProtocol, queryInterval);
  const blockchains = getUniqueBlockchains(data?.tvlByProtocol);

  return {
    data: formattedData,
    loading: isLoading,
    error,
    blockchains,
  };
};

function formatData(data?: DuneTvlProtocol[], queryInterval?: 'M' | 'Y' | 'ALL') {
  if (typeof data === 'undefined') return data;
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

  const transformedData: Record<string, TvlProtocol> = data.reduce((prev, item) => {
    const { day, blockchain, layer_usd, total_usd } = item;

    if (!prev[day]) {
      prev[day] = {
        day,
        totalUsd: total_usd,
        label: format(new Date(parseISO(day)), 'dd/MM'),
        labelType: queryInterval,
      } as TvlProtocol;
    }

    prev[day][blockchain] = layer_usd;

    return prev;
  }, {} as Record<string, TvlProtocol>);

  return Object.values(transformedData)
    .filter((e) => (queryInterval === 'ALL' ? !!e.day : isAfter(parseISO(e.day), startDate)))
    .sort((x, y) => (x.day < y.day ? -1 : x.day > y.day ? 1 : 0));
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
