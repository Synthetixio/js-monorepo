import useLocalStorage from './useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../constants/storage';
import { TransactionStatus } from '@snx-v2/txnReducer';
import { useMemo } from 'react';

export interface BridgingHistory {
  walletAddress: string;
  networkId: number;
  amount: number;
  status: TransactionStatus;
  date: string;
  txnHash?: string | null;
}

const useBridgingHistoryStore = ({
  walletAddress,
}: {
  walletAddress?: string | null;
}) => {
  const [storedValue, setValue] = useLocalStorage(
    LOCAL_STORAGE_KEYS.BRIDGING_HISTORY,
    <BridgingHistory[]>[]
  );
  const selectedHistories = useMemo(
    () => storedValue.filter((e) => e.walletAddress === walletAddress) ?? [],
    [storedValue, walletAddress]
  );

  const saveBridgingHistory = (value: BridgingHistory) => {
    const storedHistory = storedValue.findIndex(
      (e) =>
        e.walletAddress === value.walletAddress &&
        e.networkId === value.networkId &&
        e.txnHash === value.txnHash
    );
    if (storedHistory !== -1) {
      storedValue[storedHistory].status = value.status;
    } else {
      storedValue.push(value);
    }
    setValue(storedValue);
  };

  return { bridgingHistory: selectedHistories, saveBridgingHistory };
};

export default useBridgingHistoryStore;
