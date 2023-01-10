import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { TransactionStatus } from './TransactionStatus';
import { StepIcon } from './StepIcon';
import { statusColor } from './statusColor';

export function Step({ status, children }: PropsWithChildren<{ status: TransactionStatus }>) {
  return (
    <Flex
      width={10}
      height={10}
      justifyContent="center"
      alignItems="center"
      bg={statusColor(status)}
      rounded="full"
      transitionProperty="background"
      transitionDuration="normal"
    >
      <StepIcon status={status}>{children}</StepIcon>
    </Flex>
  );
}
