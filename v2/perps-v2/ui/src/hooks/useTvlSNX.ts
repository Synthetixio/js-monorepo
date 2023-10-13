import { QUERY_KEYS } from '../utils';

import { useQuery } from 'react-query';
import { DuneTvlSNX, getTvlSNX } from '../dune/synthetixV3';
import { DuneListResponse } from '../dune/types';
import { format, isAfter, parseISO, subDays } from 'date-fns';

export interface TvlSNX {
  day: string;
  opSNX: number;
  ethSNX: number;
  totalSNX: number;
  label?: string;
  labelType?: 'M' | 'Y' | 'ALL';
}

export const useTvlSNX = (queryInterval: 'M' | 'Y' | 'ALL') => {
  const { data, isLoading, error } = useQuery([QUERY_KEYS.GET_TVL_SNX], () => getTvlSNX(), {
    retry: 0,
  });
  const formattedData = formatData(data, queryInterval);

  return {
    data: formattedData,
    loading: isLoading,
    error,
  };
};

function formatData(data?: DuneListResponse<DuneTvlSNX>, queryInterval?: 'M' | 'Y' | 'ALL') {
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

  return (
    queryInterval === 'ALL'
      ? data.rows
      : data.rows.filter((e) => isAfter(parseISO(e.day), startDate))
  )
    .map((stat) => {
      const totalSNX = stat.eth_SNX + stat.op_SNX;
      return {
        day: stat.day,
        ethSNX: stat.eth_SNX,
        opSNX: stat.op_SNX,
        label: format(new Date(parseISO(stat.day)), 'dd/MM'),
        labelType: queryInterval,
        totalSNX,
      } as TvlSNX;
    })
    .sort((x, y) => (x.day < y.day ? -1 : x.day > y.day ? 1 : 0));
}
