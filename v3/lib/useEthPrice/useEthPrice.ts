import { useNetwork } from '@snx-v3/useBlockchain';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';

export const useEthPrice = () => {
  const { data: collateralTypes } = useCollateralTypes();
  const { data: CoreProxy } = useCoreProxy();
  const network = useNetwork();

  return useQuery({
    queryKey: [
      network.name,
      {
        collateralTypes: collateralTypes?.map((x) => x.tokenAddress).sort(),
        CoreProxy: CoreProxy?.address,
      },
      'eth-price',
    ],
    queryFn: () => {
      if (!CoreProxy || !collateralTypes) throw Error('Query should not be enabled');
      const ethCollateral = collateralTypes.find((x) => x.symbol === 'WETH');
      return ethCollateral?.price || wei(0);
    },
    enabled: Boolean(CoreProxy && collateralTypes?.length && network.isSupported),
  });
};
