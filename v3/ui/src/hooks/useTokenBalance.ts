import { useAccount, useBalance, useNetwork } from 'wagmi';
import { compareAddress, formatValue, parseUnits } from '../utils/helpers';
import { useEthCollateralType } from '@snx-v3/useCollateralTypes';

export const useTokenBalance = (token: `0x${string}` | undefined, chainId?: number | undefined) => {
  const { address: accountAddress } = useAccount();
  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);
  const ethCollateral = useEthCollateralType();

  const { data: balanceData, refetch } = useBalance({
    address: accountAddress,
    token: compareAddress(token, ethCollateral?.tokenAddress) ? undefined : token,
    enabled: hasWalletConnected,
    chainId: chainId || activeChain?.id,
  });

  return {
    value: balanceData?.value || parseUnits(0),
    decimals: balanceData?.decimals || 18,
    formattedValue: formatValue(balanceData?.value || 0, balanceData?.decimals || 18),
    refetch,
  };
};
