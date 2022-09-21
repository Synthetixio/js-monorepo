import { ethers } from 'ethers';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { formatValue } from '../utils/helpers';

export const useTokenBalance = (token: string | undefined) => {
  const { address: accountAddress } = useAccount();
  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);

  const { data: balanceData } = useBalance({
    addressOrName: accountAddress,
    token: token,
    enabled: hasWalletConnected,
  });

  return {
    value: balanceData?.value || ethers.BigNumber.from(0),
    decimals: balanceData?.decimals || 18,
    formatedValue: formatValue(balanceData?.value || 0, balanceData?.decimals || 18),
  };
};
