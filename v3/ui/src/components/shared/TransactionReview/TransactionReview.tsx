import { InfoIcon } from '@chakra-ui/icons';
import { Checkbox, Flex, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { statusColor, Step } from '../Step/Step';
import { StepStatus, Transaction } from './TransactionReview.types';

interface Props {
  status: StepStatus;
  transaction: Transaction;
  index: number;
  setChecked: (checked: boolean) => void;
  isLoading: boolean;
}

export const TransactionReview: FC<Props> = ({
  transaction,
  status,
  index,
  setChecked,
  isLoading,
}) => (
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
      <Text fontSize="xs" opacity="0.66">
        {transaction.subtitle}
      </Text>
      {transaction.checkboxLabel && (
        <Checkbox
          isChecked={!!transaction.checked}
          onChange={(e) => setChecked(e.target.checked)}
          size="sm"
          disabled={status === StepStatus.Completed || status === StepStatus.Current || isLoading}
        >
          <Text fontSize="xs" opacity="0.66">
            {transaction.checkboxLabel}
          </Text>
        </Checkbox>
      )}
    </Flex>
    {transaction.information && (
      <Tooltip label={transaction.information}>
        <InfoIcon position="absolute" right={4} />
      </Tooltip>
    )}
  </Flex>
);
