import { PropsWithChildren, ReactElement } from 'react';
import { Box, Checkbox, CheckboxProps, Flex, Text } from '@chakra-ui/react';
import { Step } from './Step';
import { statusColor } from './statusColor';
import { MultistepStatus } from './MultistepStatus';

function StepCheckbox({ children, ...props }: PropsWithChildren<CheckboxProps>) {
  return (
    <Flex mt="0.5">
      <Checkbox size="sm" {...props}>
        <Box fontSize="xs" opacity="0.66">
          {children}
        </Box>
      </Checkbox>
    </Flex>
  );
}

export function Multistep({
  step,
  title,
  subtitle,
  checkboxLabel,
  checkboxProps,
  status,
  children,
}: PropsWithChildren<{
  step: number;
  title: string | ReactElement;
  subtitle?: string | ReactElement;
  checkboxLabel?: string;
  checkboxProps?: CheckboxProps;
  status: MultistepStatus;
}>) {
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
          <Text as="div" fontSize="xs" opacity="0.66">
            {subtitle}
          </Text>
        ) : null}
        {checkboxLabel ? <StepCheckbox {...checkboxProps}>{checkboxLabel}</StepCheckbox> : null}
        {children}
      </Flex>
    </Flex>
  );
}
