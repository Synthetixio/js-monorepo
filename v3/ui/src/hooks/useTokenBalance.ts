import { ethers } from 'ethers';
import { useAccount, useBalance, useNetwork } from 'wagmi';

export const useTokenBalance = (token: string | undefined) => {
  const { address: accountAddress } = useAccount();
  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);

  const { data: balanceData } = useBalance({
    addressOrName: accountAddress,
    token: token,
    enabled: hasWalletConnected,
  });

  const balance = balanceData?.value || ethers.BigNumber.from(0);
  const decimals = balanceData?.decimals || 18;

  return {
    value: balance,
    decimals,
  };
};
