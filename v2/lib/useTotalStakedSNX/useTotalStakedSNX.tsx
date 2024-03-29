import { useQuery } from '@tanstack/react-query';

const STAKED_SNX_DATA_URL = 'https://api.synthetix.io/staking-ratio';

export type StakedSNXResponse = {
  systemStakingPercent: number;
  timestamp: number;
  stakedSnx: {
    ethereum: number;
    optimism: number;
  };
};
export const useTotalStakedSNX = () => {
  return useQuery({
    queryKey: ['staking-ratio'],
    queryFn: async () => {
      const resp = await fetch(STAKED_SNX_DATA_URL);

      const data: StakedSNXResponse = await resp.json();
      return data;
    },
    staleTime: 3600000, // 1hour min cache, the api doesn't update more frequently than that
  });
};
