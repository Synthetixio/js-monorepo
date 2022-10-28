import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { NetworkIdByName, NetworkNameById } from '@snx-v2/useSynthetixContracts';
import type { NetworkId } from '@snx-v2/useSynthetixContracts';

export const getEtherscanBaseUrl = (networkId: number) => {
  if (networkId !== NetworkIdByName.mainnet) {
    return `https://${NetworkNameById[networkId]}.etherscan.io`;
  }
  return `https://etherscan.io`;
};
export const getTxnLink = (networkId: number, txnId: string | null) => {
  if (!txnId) return null;
  const baseUrl = getEtherscanBaseUrl(networkId);
  return `${baseUrl}/tx/${txnId}`;
};

export const useGetTxnLink = (txnHash: string | null) => {
  const { networkId } = useContext(ContractContext);
  return getTxnLink(networkId as NetworkId, txnHash);
};
