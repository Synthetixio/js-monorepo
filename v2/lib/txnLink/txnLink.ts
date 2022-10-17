import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { NetworkIdByName, NetworkNameById } from '@snx-v2/useSynthetixContracts';

export const getTxnLink = (networkId: number | null, txnId: string | null) => {
  if (!txnId) return null;
  if (networkId !== NetworkIdByName.mainnet) {
    return `https://${NetworkNameById[networkId]}.etherscan.io/tx/${txnId}`;
  }
  return `https://etherscan.io/tx/${txnId}`;
};

export const useGetTxnLink = (txnHash: string | null) => {
  const { networkId } = useContext(ContractContext);
  return getTxnLink(networkId, txnHash);
};
