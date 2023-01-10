import { ChangeEvent } from 'react';
import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { Step } from './Step';
import { statusColor } from './statusColor';
import { TransactionStatus } from './TransactionStatus';

export function TransactionReview({
  step,
  status,
  title,
  subtitle,
  checkbox,
  isLoading,
}: {
  step: number;
  status: TransactionStatus;
  title: string;
  subtitle?: string;
  checkbox?: {
    label: string;
    isChecked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
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
      borderColor={statusColor(status)}
    >
      <Step status={status}>{step}</Step>
      <Flex direction="column">
        <Text>{title}</Text>

        {subtitle ? (
          <Text fontSize="xs" opacity="0.66">
            {subtitle}
          </Text>
        ) : null}

        {checkbox ? (
          <Flex mt="0.5">
            <Checkbox
              isChecked={checkbox.isChecked}
              onChange={checkbox.onChange}
              size="sm"
              disabled={status === 'completed' || status === 'processing' || isLoading}
            >
              <Box fontSize="xs" opacity="0.66">
                {checkbox.label}
              </Box>
            </Checkbox>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
}
