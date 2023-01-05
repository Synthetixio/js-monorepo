import { useBalance } from 'wagmi';
import { compareAddress, formatValue, parseUnits } from '@snx-v3/format';
import { useEthCollateralType } from '@snx-v3/useCollateralTypes';
import { useAccount, useNetwork } from '@snx-v3/useBlockchain';
import { assertAddressType } from '../utils/ts-helpers';

export const useTokenBalance = (token: string | undefined, chainId?: number | undefined) => {
  const tokenAddress = assertAddressType(token) ? token : undefined;
  const { address } = useAccount();
  const activeChain = useNetwork();
  const hasWalletConnected = Boolean(activeChain.name);
  const ethCollateral = useEthCollateralType();

  const { data: balanceData, refetch } = useBalance({
    address,
    token: compareAddress(tokenAddress, ethCollateral?.tokenAddress) ? undefined : tokenAddress,
    enabled: hasWalletConnected,
    chainId: chainId || activeChain?.id,
  });

  return {
    value: balanceData?.value || parseUnits(0),
    formattedValue: formatValue(balanceData?.value || 0),
    refetch,
  };
};
