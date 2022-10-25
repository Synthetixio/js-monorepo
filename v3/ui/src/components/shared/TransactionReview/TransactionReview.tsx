import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { StepIcon } from '../Step/StepIcon';
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
  const getStatusColor = () => {
    switch (status) {
      case StepStatus.Completed:
        return 'green.700';
      case StepStatus.Error:
        return 'red.500';
      default:
        return 'gray.700';
    }
  };

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
      borderColor={getStatusColor()}
    >
      <Flex
        width={10}
        height={10}
        justifyContent="center"
        alignItems="center"
        bg={getStatusColor()}
        rounded="full"
        transitionProperty="background"
        transitionDuration="normal"
      >
        <StepIcon status={status}>{index + 1}</StepIcon>
      </Flex>
      <Text>{transaction.title}</Text>
      <Text fontSize="xs" opacity="0.66" mt="1'">
        {transaction.subtitle}
      </Text>
      <Tooltip label="More information about this transaction">
        <InfoIcon position="absolute" right={4} />
      </Tooltip>
      {/* <Button ml="auto" size="sm" variant="outline">
        Submit
      </Button> */}
    </Flex>
  );
};
