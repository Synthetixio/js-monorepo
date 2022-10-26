import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { statusColor, Step } from '../Step/Step';
import { StepStatus, Transaction } from './TransactionReview.types';

interface TransactionReviewProps {
  address?: string;
  callFunc?: string;
  callArgs?: any[];
  status: StepStatus;
  transaction: Transaction;
  index: number;
}

export const TransactionReview: FC<TransactionReviewProps> = ({ transaction, status, index }) => {
  return (
    <Flex
      position="relative"
      alignItems="center"
      gap={4}
      rounded="lg"
      mt="4"
      p="4"
      border="2px solid"
      transitionProperty="border-color"
      transitionDuration="normal"
      borderColor={statusColor[status]}
    >
      <Step status={status}>{index + 1}</Step>
      <Flex direction="column">
        <Text>{transaction.title}</Text>
        <Text fontSize="xs" opacity="0.66" mt="1'">
          {transaction.subtitle}
        </Text>
      </Flex>
      {transaction.information && (
        <Tooltip label={transaction.information}>
          <InfoIcon position="absolute" right={4} />
        </Tooltip>
      )}
    </Flex>
  );
};
