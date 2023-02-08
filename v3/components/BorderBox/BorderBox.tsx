import { Flex, FlexProps } from '@chakra-ui/react';

export const BorderBox = (props: FlexProps) => (
  <Flex bg="navy.900" borderWidth="1px" borderColor="gray.900" borderRadius="base" {...props} />
);
