import { atom } from 'recoil';
import { Transaction } from '../components/shared/TransactionReview/TransactionReview.types';

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
