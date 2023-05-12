import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { wei } from '@synthetixio/wei';

export const useEthPrice = () => {
  const { data: collateralTypes } = useCollateralTypes();
  if (!collateralTypes) {
    return {
      data: wei(0),
    };
  }
  const ethCollateral = collateralTypes.find((x) => x.symbol === 'WETH');
  if (ethCollateral && ethCollateral.price) {
    return {
      data: ethCollateral.price,
    };
  }
  return {
    data: wei(0),
  };
};
