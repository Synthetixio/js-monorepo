import { QUERY_KEYS } from '../utils';

import { useQuery } from 'react-query';
import { DuneSNXSupply, getSNXusdSupply } from '../dune/synthetixV3';
import { DuneListResponse } from '../dune/types';
import { format, isAfter, parseISO, subDays } from 'date-fns';

export interface SNXusdSupply {
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

export const useSNXusdSupply = (queryInterval: 'M' | 'Y' | 'ALL') => {
  const { data, isLoading, error } = useQuery(
    [QUERY_KEYS.GET_SNX_SUPPLY],
    () => getSNXusdSupply(),
    {
      retry: 0,
    }
  );
  const formattedData = formatData(data, queryInterval);

  return {
    data: formattedData,
    loading: isLoading,
    error,
  };
};

function formatData(data?: DuneListResponse<DuneSNXSupply>, queryInterval?: 'M' | 'Y' | 'ALL') {
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
      } as SNXusdSupply;
    })
    .sort((x, y) => (x.day < y.day ? -1 : x.day > y.day ? 1 : 0));
}
