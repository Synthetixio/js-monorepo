import { Button } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { TransactionReview } from './TransactionReview';
import { StepStatus, Transaction } from './TransactionReview.types';

interface StepProps {
  transacions: Transaction[];
  onSuccess?: () => void;
}

export const MultipleTransactionReview: FC<StepProps> = ({ transacions, onSuccess }) => {
  const [step, setStep] = useState(-1);
  const [error, setError] = useState(false);

  const submit = useCallback(async () => {
    try {
      let i = 0;
      if (error) {
        setError(false);
        i = step;
      }
      for (; i < transacions.length; i++) {
        setStep(i);
        await transacions[i].call?.();
      }
      setStep(transacions.length);
    } catch (error) {
      setError(true);
    }
  }, [error, step, transacions]);

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

  const isLoading = step > -1 && step < transacions.length && !error;

  return (
    <>
      {transacions.map((tx, i) => (
        <TransactionReview key={i} index={i} transaction={tx} status={getStatus(i)} />
      ))}
      {transacions.length > step && (
        <Button disabled={isLoading} onClick={submit} width="100%" my="4">
          {error ? 'Retry' : 'Submit'}
        </Button>
      )}
      {onSuccess && transacions.length === step && (
        <Button onClick={onSuccess} width="100%" my="4">
          Done
        </Button>
      )}
    </>
  );
};
