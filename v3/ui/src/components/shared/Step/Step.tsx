import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { StepIcon } from './StepIcon';
import { StepStatus } from '../TransactionReview/TransactionReview.types';

interface StepProps {
  status: StepStatus;
  children: ReactNode;
}

export const Step: FC<StepProps> = ({ status, children }) => {
  return (
    <Flex
      width={10}
      height={10}
      justifyContent="center"
      alignItems="center"
      bg="gray.700"
      rounded="full"
    >
      <StepIcon status={status}>{children}</StepIcon>
    </Flex>
  );
};
