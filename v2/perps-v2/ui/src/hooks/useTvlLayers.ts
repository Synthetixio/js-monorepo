import { QUERY_KEYS } from '../utils';

import { useQuery } from '@tanstack/react-query';
import { format, isAfter, parseISO, subDays } from 'date-fns';
import { getTVLs } from '../api/synthetixV3';
import { DuneTvlLayer } from '../api/types';
export interface TvlLayer {
  day: string;
  opSNX: number;
  ethSNX: number;
  totalSNX: number;
  label?: string;
  labelType?: 'M' | 'Y' | 'ALL';
}

export const useTvlLayers = (queryInterval: 'M' | 'Y' | 'ALL') => {
  const { data, isLoading, error } = useQuery([QUERY_KEYS.GET_TVL], () => getTVLs(), {
    retry: 0,
  });
  const formattedData = formatData(data?.tvlByLayer, queryInterval);
  const totalToday = getTotalToday(formattedData);

  return {
    data: formattedData,
    loading: isLoading,
    error,
    totalToday,
  };
};

function formatData(data?: DuneTvlLayer[], queryInterval?: 'M' | 'Y' | 'ALL') {
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

  return (queryInterval === 'ALL' ? data : data.filter((e) => isAfter(parseISO(e.day), startDate)))
    .map((stat) => {
      const totalSNX = stat.eth_SNX + stat.op_SNX;
      return {
        day: stat.day,
        ethSNX: stat.eth_SNX,
        opSNX: stat.op_SNX,
        label: format(new Date(parseISO(stat.day)), 'dd/MM'),
        labelType: queryInterval,
        totalSNX,
      } as TvlLayer;
    })
    .sort((x, y) => (x.day < y.day ? -1 : x.day > y.day ? 1 : 0));
}

function getTotalToday(data?: TvlLayer[]): number {
  if (!data || data.length === 0) return 0;
  const current = data[data.length - 1];
  return current.totalSNX;
}
