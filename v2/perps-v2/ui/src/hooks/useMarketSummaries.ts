import { parseBytes32String } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { perpsMarketDataContract } from './usePositions';

export const useMarketSummaries = () => {
  const [data, setData] = useState<{ asset: string; address: string }[]>([]);
  useEffect(() => {
    perpsMarketDataContract
      .allProxiedMarketSummaries()
      .then((res) =>
        setData(
          res.map((x) => ({ asset: parseBytes32String(x.asset), address: x.market.toLowerCase() }))
        )
      );
  }, []);

  return { isLoading: data.length === 0, data };
};
