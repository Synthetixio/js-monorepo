import { QUERY_KEYS } from '../utils';

import { useQuery } from 'react-query';
import { format, isAfter, parseISO, subDays } from 'date-fns';
import { getDelegations } from '../api/synthetixV3';
import { DuneDelegation } from '../api/types';

export interface Delegation {
  day: string;
  label?: string;
  labelType?: 'M' | 'Y' | 'ALL';
  totalDailyDelegations: number;
  totalDailyDelegationsUsd: number;
  totalCumDelegationsUsd: number;
  totalCumDelegations: number;
  [blockchain: string]: any;
}

export const useDelegations = (queryInterval: 'M' | 'Y' | 'ALL') => {
  const { data, isLoading, error } = useQuery(
    [QUERY_KEYS.GET_DELEGATIONS],
    () => getDelegations(),
    {
      retry: 0,
    }
  );
  const blockchains = getUniqueBlockchains(data);
  const ids = getUniqueId(data);
  const formattedData = formatData(data, queryInterval);
  const totalToday = getTotalToday(formattedData);

  return {
    data: formattedData,
    loading: isLoading,
    error,
    blockchains,
    ids,
    totalToday,
  };
};

function formatData(data?: DuneDelegation[], queryInterval?: 'M' | 'Y' | 'ALL') {
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

  const transformedData: Record<string, Delegation> = data.reduce((prev, item) => {
    const {
      day,
      blockchain,
      tokenPrice,
      cumDelegation,
      daily_delegations,
      daily_delegations_USD,
      ID,
    } = item;

    if (!prev[day]) {
      prev[day] = {
        day,
        label: format(new Date(parseISO(day)), 'dd/MM'),
        labelType: queryInterval,
        totalDailyDelegations: 0,
        totalDailyDelegationsUsd: 0,
        totalCumDelegationsUsd: 0,
        totalCumDelegations: 0,
      } as Delegation;
    }

    prev[day][blockchain] = {
      id: ID.replaceAll('-', ' '),
      dailyDelegations: daily_delegations,
      dailyDelegationsUsd: daily_delegations_USD,
      cumDelegationUsd: cumDelegation * tokenPrice,
      cumDelegation: cumDelegation,
      tokenPrice: tokenPrice,
    };

    prev[day].totalCumDelegations += prev[day][blockchain].cumDelegation;
    prev[day].totalCumDelegationsUsd += prev[day][blockchain].cumDelegationUsd;
    prev[day].totalDailyDelegationsUsd += prev[day][blockchain].dailyDelegationsUsd;
    prev[day].totalDailyDelegations += prev[day][blockchain].dailyDelegations;

    return prev;
  }, {} as Record<string, Delegation>);

  return Object.values(transformedData)
    .filter((e) => (queryInterval === 'ALL' ? !!e.day : isAfter(parseISO(e.day), startDate)))
    .sort((x, y) => (x.day < y.day ? -1 : x.day > y.day ? 1 : 0));
}

function getUniqueBlockchains(data?: DuneDelegation[]): string[] {
  if (!data) return [];
  return data.reduce((uniqueBlockchains: string[], item) => {
    if (!uniqueBlockchains.includes(item.blockchain)) {
      uniqueBlockchains.push(item.blockchain);
    }
    return uniqueBlockchains;
  }, []);
}

function getUniqueId(data?: DuneDelegation[]): string[] {
  if (!data) return [];
  return data
    .reduce((uniqueId: string[], item) => {
      if (!uniqueId.includes(item.ID)) {
        uniqueId.push(item.ID);
      }
      return uniqueId;
    }, [])
    .map((e) => e.replaceAll('-', ' '));
}

function getTotalToday(data?: Delegation[]): number {
  if (!data || data.length === 0) return 0;
  const current = data[data.length - 1];
  return current.totalCumDelegationsUsd;
}
