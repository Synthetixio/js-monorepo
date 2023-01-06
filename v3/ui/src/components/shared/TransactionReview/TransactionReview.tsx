import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { statusColor, Step } from '../Step/Step';
import { Transaction, TransactionStatus } from '@snx-v3/useTransactionState';

export function TransactionReview({
  transaction,
  status,
  index,
  setChecked,
  isLoading,
}: {
  status: TransactionStatus;
  transaction: Transaction;
  index: number;
  setChecked: (checked: boolean) => void;
  isLoading: boolean;
}) {
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
        <Text fontSize="xs" opacity="0.66">
          {transaction.subtitle}
        </Text>
        {transaction.checkboxLabel && (
          <Flex mt="0.5">
            <Checkbox
              isChecked={!!transaction.checked}
              onChange={(e) => setChecked(e.target.checked)}
              size="sm"
              disabled={status === 'completed' || status === 'current' || isLoading}
            >
              <Box fontSize="xs" opacity="0.66">
                {transaction.checkboxLabel}
              </Box>
            </Checkbox>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
