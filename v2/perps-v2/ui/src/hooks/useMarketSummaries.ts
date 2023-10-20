import { parseBytes32String } from 'ethers/lib/utils';
import { useEffect, useState, useMemo } from 'react';
import { initPerpsMarketData } from '../utils';
import { useEthersProvider } from '../utils/ProviderContext';

export const useMarketSummaries = () => {
  const [data, setData] = useState<{ asset: string; address: string }[]>([]);
  const { provider } = useEthersProvider();

  const perpsMarketDataContract = useMemo(() => initPerpsMarketData(provider), [provider]);

  useEffect(() => {
    perpsMarketDataContract
      .allProxiedMarketSummaries()
      .then((res) =>
        setData(
          res.map((x) => ({ asset: parseBytes32String(x.asset), address: x.market.toLowerCase() }))
        )
      );
  }, [perpsMarketDataContract]);

  return { isLoading: data.length === 0, data };
};
