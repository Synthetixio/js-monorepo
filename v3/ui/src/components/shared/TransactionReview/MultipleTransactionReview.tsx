import { Button } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { TransactionReview } from './TransactionReview';
import {
  TransactionStatus,
  useSetTransactionState,
  useTransactionState,
} from '@snx-v3/useTransactionState';

interface Props {
  onSuccess?: () => void;
}

export const MultipleTransactionReview: FC<Props> = ({ onSuccess }) => {
  const { data: transactionState } = useTransactionState();
  const setTransactionState = useSetTransactionState();
  const [step, setStep] = useState(-1);
  const [error, setError] = useState(false);

  const submit = useCallback(async () => {
    if (!transactionState) {
      return;
    }
    try {
      let i = 0;
      if (error) {
        setError(false);
        i = step;
      }
      for (; i < transactionState.transactions.length; i++) {
        setStep(i);
        // @ts-ignore
        await transactionState.transactions[i].call(transactionState.transactions[i].checked);
      }
      transactionState.onSuccess?.();
      setStep(transactionState.transactions.length);
      setTimeout(() => onSuccess?.(), 1000);
    } catch (error) {
      setError(true);
    }
  }, [error, transactionState, step, onSuccess]);

  if (!transactionState) {
    return null;
  }

  const isLoading = step > -1 && step < transactionState.transactions.length && !error;

  const getStatus = (i: number): TransactionStatus => {
    switch (true) {
      case i < step:
        return 'completed';
      case Boolean(i === step && error):
        return 'error';
      case Boolean(i === step && !error):
        return 'current';
      case i > step:
      default:
        return 'upcoming';
    }
  };

  const setChecked = (index: number) => (checked: boolean) => {
    const newList = [...transactionState.transactions];
    // @ts-ignore
    newList[index] = {
      // @ts-ignore
      ...newList[index],
      checked,
    };
    setTransactionState({ ...transactionState, transactions: newList });
  };

  return (
    <>
      {transactionState.transactions.map((transaction, i) => (
        <TransactionReview
          key={i}
          index={i}
          transaction={transaction}
          status={getStatus(i)}
          setChecked={setChecked(i)}
          isLoading={isLoading}
        />
      ))}
      {transactionState.transactions.length > step && (
        <Button isDisabled={isLoading} onClick={submit} width="100%" my="4">
          {error ? 'Retry' : 'Start'}
        </Button>
      )}
      {onSuccess && transactionState.transactions.length === step && (
        <Button onClick={onSuccess} width="100%" my="4">
          Done
        </Button>
      )}
    </>
  );
};
