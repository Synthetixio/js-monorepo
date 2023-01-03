import { atom } from 'recoil';
import { useContractRead } from 'wagmi';
import { Transaction } from '../components/shared/TransactionReview/TransactionReview.types';

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
