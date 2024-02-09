import useLocalStorage from './useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../constants/storage';
import { TransactionStatus } from '@snx-v2/txnReducer';
import { useMemo, useReducer } from 'react';

export interface BridgingHistory {
  walletAddress: string;
  networkId: number;
  amount: number;
  status: TransactionStatus;
  date: string;
  txnHash?: string | null;
  provedDate?: string;
  provedTxnHash?: string | null;
  finalizedDate?: string;
  finalizedTxnHash?: string | null;
}

export type BridgeState = {
  bridgingHistories: BridgingHistory[];
  version: number;
};

const defaultState: BridgeState = {
  bridgingHistories: [],
  version: 1,
};

const useBridgingHistoryStore = ({ walletAddress }: { walletAddress?: string | null }) => {
  const [storedValue, setValue] = useLocalStorage(
    LOCAL_STORAGE_KEYS.BRIDGING_HISTORY,
    <BridgingHistory[]>[]
  );

  const [state, dispatch] = useReducer(
    (
      state: BridgeState,
      action:
        | { type: 'setBridgingHistories'; payload: BridgingHistory[] }
        | { type: 'setState'; payload: Partial<Omit<BridgeState, 'version'>> }
    ) => {
      let newState = { ...state };
      switch (action.type) {
        case 'setState':
          newState = { ...newState, ...action.payload };
          break;
        case 'setBridgingHistories':
          newState.bridgingHistories = action.payload;
          break;
        default:
          break;
      }
      return newState;
    },
    {},
    () => {
      if (!!storedValue) {
        return {
          bridgingHistories: storedValue,
          version: 1,
        };
      }
      return defaultState;
    }
  );

  const selectedHistories = useMemo(
    () => state.bridgingHistories?.filter((e) => e.walletAddress === walletAddress) ?? [],
    [state, walletAddress]
  );

  const saveBridgingHistories = (value: BridgingHistory) => {
    const storedHistory = storedValue.findIndex(
      (e) =>
        e.walletAddress === value.walletAddress &&
        e.networkId === value.networkId &&
        e.txnHash === value.txnHash
    );
    if (storedHistory !== -1) {
      storedValue[storedHistory].status = value.status;
      storedValue[storedHistory].provedTxnHash = value.provedTxnHash;
      storedValue[storedHistory].provedDate = value.provedDate;
      storedValue[storedHistory].finalizedTxnHash = value.finalizedTxnHash;
      storedValue[storedHistory].finalizedDate = value.finalizedDate;
    } else {
      storedValue.push(value);
    }
    setValue(storedValue);
    dispatch({ type: 'setBridgingHistories', payload: storedValue });
  };

  return { bridgingHistories: selectedHistories, saveBridgingHistories };
};

export default useBridgingHistoryStore;
