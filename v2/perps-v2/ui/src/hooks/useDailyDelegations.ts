import { QUERY_KEYS } from '../utils';

import { useQuery } from 'react-query';
import { DuneDailyDelegation, getDailyDelegations } from '../dune/synthetixV3';
import { DuneListResponse } from '../dune/types';
import { format, isAfter, parseISO, subDays } from 'date-fns';

export interface DailyDelegation {
  day: string;
  label?: string;
  labelType?: 'M' | 'Y' | 'ALL';
  [blockchain: string]: any;
}

export const useDailyDelegations = (queryInterval: 'M' | 'Y' | 'ALL') => {
  const { data, isLoading, error } = useQuery(
    [QUERY_KEYS.GET_DAILY_DELEGATIONS],
    () => getDailyDelegations(),
    {
      retry: 0,
    }
  );
  const blockchains = getUniqueBlockchains(data?.rows);
  const ids = getUniqueId(data?.rows);
  const formattedData = formatData(data, queryInterval);

  return {
    data: formattedData,
    loading: isLoading,
    error,
    blockchains,
    ids,
  };
};

function formatData(
  data?: DuneListResponse<DuneDailyDelegation>,
  queryInterval?: 'M' | 'Y' | 'ALL'
) {
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

  const transformedData: Record<string, DailyDelegation> = data.rows.reduce((prev, item) => {
    const { day, blockchain, cumDelegation, daily_delegations_USD, ID } = item;

    if (!prev[day]) {
      prev[day] = {
        day,
        label: format(new Date(parseISO(day)), 'dd/MM'),
        labelType: queryInterval,
      } as DailyDelegation;
    }

    prev[day][blockchain] = {
      id: ID,
      dailyDelegationsUsd: daily_delegations_USD,
      cumDelegation,
    };

    return prev;
  }, {} as Record<string, DailyDelegation>);

  return Object.values(transformedData)
    .filter((e) => (queryInterval === 'ALL' ? !!e.day : isAfter(parseISO(e.day), startDate)))
    .sort((x, y) => (x.day < y.day ? -1 : x.day > y.day ? 1 : 0));
}

function getUniqueBlockchains(data?: DuneDailyDelegation[]): string[] {
  if (!data) return [];
  return data.reduce((uniqueBlockchains: string[], item) => {
    if (!uniqueBlockchains.includes(item.blockchain)) {
      uniqueBlockchains.push(item.blockchain);
    }
    return uniqueBlockchains;
  }, []);
}

function getUniqueId(data?: DuneDailyDelegation[]): string[] {
  if (!data) return [];
  return data.reduce((uniqueId: string[], item) => {
    if (!uniqueId.includes(item.ID)) {
      uniqueId.push(item.ID);
    }
    return uniqueId;
  }, []);
}
