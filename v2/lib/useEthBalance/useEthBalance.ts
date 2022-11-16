import { ContractContext } from '@snx-v2/ContractContext';
import { SignerContext } from '@snx-v2/SignerContext';
import { useContext } from 'react';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';

export const useEthBalance = () => {
  const { walletAddress, networkId } = useContext(ContractContext);
  const signer = useContext(SignerContext);

  return useQuery(
    ['useEthBalanceQuery', walletAddress, networkId],
    async () => {
      if (!signer) throw Error('Query should not be enabled');
      const balance = await signer.getBalance();
      return wei(balance);
    },
    { enabled: Boolean(signer) }
  );
};
