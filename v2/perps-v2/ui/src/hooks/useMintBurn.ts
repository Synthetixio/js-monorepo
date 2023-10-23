import { QUERY_KEYS } from '../utils';

import { useQuery } from 'react-query';
import { format, isAfter, parseISO, subDays } from 'date-fns';
import { getMintBurns } from '../api/synthetixV3';
import { DuneMintBurn } from '../api/types';

export interface MintBurn {
  day: string;
  ethSNXSupply: number;
  ethMints: number;
  ethBurns: number;
  opSNXSupply: number;
  opMints: number;
  opBurns: number;
  totalSNXSupply: number;
  totalMintBurn: number;
  label?: string;
  labelType?: 'M' | 'Y' | 'ALL';
}

export const useMintBurn = (queryInterval: 'M' | 'Y' | 'ALL') => {
  const { data, isLoading, error } = useQuery([QUERY_KEYS.GET_MINT_BURN], () => getMintBurns(), {
    retry: 0,
  });
  const formattedData = formatData(data, queryInterval);
  const totalToday = getTotalToday(formattedData);

  return {
    data: formattedData,
    loading: isLoading,
    error,
    totalToday,
  };
};

function formatData(data?: DuneMintBurn[], queryInterval?: 'M' | 'Y' | 'ALL') {
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
      const totalSNXSupply = stat.eth_snxUSD_supply + stat.op_snxUSD_supply;
      const totalMintBurn = stat.eth_mints + stat.eth_burns + stat.op_mints + stat.op_burns;
      return {
        day: stat.day,
        ethSNXSupply: stat.eth_snxUSD_supply,
        ethMints: stat.eth_mints,
        ethBurns: stat.eth_burns,
        opSNXSupply: stat.op_snxUSD_supply,
        opMints: stat.op_mints,
        opBurns: stat.op_burns,
        label: format(new Date(parseISO(stat.day)), 'dd/MM'),
        labelType: queryInterval,
        totalSNXSupply,
        totalMintBurn,
      } as MintBurn;
    })
    .sort((x, y) => (x.day < y.day ? -1 : x.day > y.day ? 1 : 0));
}

function getTotalToday(data?: MintBurn[]): number {
  if (!data || data.length === 0) return 0;
  const current = data[data.length - 1];
  return current.totalSNXSupply;
}
