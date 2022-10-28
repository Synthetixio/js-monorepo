import { Button } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { transactionState } from '../../../utils/state';
import { TransactionReview } from './TransactionReview';
import { StepStatus } from './TransactionReview.types';

interface Props {
  onSuccess?: () => void;
}

export const MultipleTransactionReview: FC<Props> = ({ onSuccess }) => {
  const [txState, setTransaction] = useRecoilState(transactionState);
  const [step, setStep] = useState(-1);
  const [error, setError] = useState(false);

  const { transactions } = txState;

  const submit = useCallback(async () => {
    try {
      let i = 0;
      if (error) {
        setError(false);
        i = step;
      }
      for (; i < transactions.length; i++) {
        setStep(i);
        await transactions[i].call?.(transactions[i].checked);
      }
      txState.onSuccess?.();
      setStep(transactions.length);
      setTimeout(() => onSuccess?.(), 1000);
    } catch (error) {
      setError(true);
    }
  }, [error, onSuccess, step, transactions, txState]);

  const getStatus = (i: number) => {
    if (i < step) {
      return StepStatus.Completed;
    }
    if (i === step) {
      if (error) {
        return StepStatus.Error;
      }
      return StepStatus.Current;
    }
    return StepStatus.Upcoming;
  };

  const setChecked = (index: number) => (checked: boolean) => {
    const newList = [...transactions];
    newList[index] = {
      ...newList[index],
      checked,
    };
    setTransaction({ ...txState, transactions: newList });
  };

  const isLoading = step > -1 && step < transactions.length && !error;

  return (
    <>
      {transactions.map((tx, i) => (
        <TransactionReview
          key={i}
          index={i}
          transaction={tx}
          status={getStatus(i)}
          setChecked={setChecked(i)}
          isLoading={isLoading}
        />
      ))}
      {transactions.length > step && (
        <Button disabled={isLoading} onClick={submit} width="100%" my="4">
          {error ? 'Retry' : 'Start'}
        </Button>
      )}
      {onSuccess && transactions.length === step && (
        <Button onClick={onSuccess} width="100%" my="4">
          Done
        </Button>
      )}
    </>
  );
};
