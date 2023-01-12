import { useBalance } from '@snx-v3/useBalance';
import { compareAddress } from '@snx-v3/format';
import { useEthCollateralType } from '@snx-v3/useCollateralTypes';
import { assertAddressType } from '../utils/ts-helpers';
import { wei } from '@synthetixio/wei';

export const useTokenBalance = (token: string | undefined, chainId?: number | undefined) => {
  const tokenAddress = assertAddressType(token) ? token : undefined;
  const ethCollateral = useEthCollateralType();

  const { data: balanceData, refetch } = useBalance({
    tokenAddress: compareAddress(tokenAddress, ethCollateral?.tokenAddress) ? 'ETH' : tokenAddress,
    customNetwork: chainId,
  });

  return {
    value: balanceData || wei(0),
    formattedValue: balanceData?.toString(2),
    refetch,
  };
};
