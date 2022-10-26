import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { StepIcon } from './StepIcon';
import { StepStatus } from '../TransactionReview/TransactionReview.types';

interface StepProps {
  status: StepStatus;
  children: ReactNode;
}

export const statusColor = {
  [StepStatus.Completed]: 'green.700',
  [StepStatus.Error]: 'red.700',
  [StepStatus.Current]: 'gray.700',
  [StepStatus.Upcoming]: 'gray.700',
};

export const Step: FC<StepProps> = ({ status, children }) => {
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
};
