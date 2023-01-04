import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { StepIcon } from './StepIcon';
import { StepStatus } from '../TransactionReview/TransactionReview.types';

interface StepProps {
  status: StepStatus;
}

export const statusColor = {
  [StepStatus.Completed]: 'green.700',
  [StepStatus.Error]: 'red.700',
  [StepStatus.Current]: 'gray.700',
  [StepStatus.Upcoming]: 'gray.700',
};

export function Step({ status, children }: PropsWithChildren<StepProps>) {
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
