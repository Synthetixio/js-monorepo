import { ethers } from 'ethers';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { compareAddress, formatValue } from '../utils/helpers';
import { useEthCollateralType } from '@snx-v3/useCollateralTypes';

export const useTokenBalance = (token: string | undefined, chainId?: number | undefined) => {
  const { address: accountAddress } = useAccount();
  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);
  const ethCollateral = useEthCollateralType();

  const { data: balanceData, refetch } = useBalance({
    addressOrName: accountAddress,
    token: compareAddress(token, ethCollateral?.tokenAddress) ? undefined : token,
    enabled: hasWalletConnected,
    chainId: chainId || activeChain?.id,
  });

  return {
    value: balanceData?.value || ethers.BigNumber.from(0),
    decimals: balanceData?.decimals || 18,
    formatedValue: formatValue(balanceData?.value || 0, balanceData?.decimals || 18),
    refetch,
  };
};
