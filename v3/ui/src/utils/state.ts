import { atom } from 'recoil';
import { useContractRead } from 'wagmi';
import { Transaction } from '../components/shared/TransactionReview/TransactionReview.types';
import { CollateralType } from './types';

export const collateralTypesState = atom<Array<CollateralType>>({
  key: 'collateralTypes',
  default: [],
});

export const poolsState = atom<Array<string>>({
  key: 'pools',
  default: [],
});

type RefetchType = ReturnType<typeof useContractRead>['refetch'];
export const accountsState = atom<{
  accounts: Array<number>;
  refetchAccounts?: RefetchType;
}>({
  key: 'userAccounts',
  default: {
    accounts: [],
  },
});

export const chainIdState = atom({
  key: 'localChainId',
  default: 0,
});

interface TransactionState {
  transactions: Transaction[];
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  onSuccess?: () => void;
}
export const transactionState = atom<TransactionState>({
  key: 'transactionState',
  default: {
    transactions: [],
    isOpen: false,
  },
});
