import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { StepIcon } from './StepIcon';
import { TransactionStatus } from '@snx-v3/useTransactionState';

export const statusColor = {
  completed: 'green.700',
  error: 'red.700',
  current: 'gray.700',
  upcoming: 'gray.700',
};

export function Step({ status, children }: PropsWithChildren<{ status: TransactionStatus }>) {
  return (
    <Flex
      width={10}
      height={10}
      justifyContent="center"
      alignItems="center"
      bg={statusColor[status]}
      rounded="full"
      transitionProperty="background"
      transitionDuration="normal"
    >
      <StepIcon status={status}>{children}</StepIcon>
    </Flex>
  );
}
