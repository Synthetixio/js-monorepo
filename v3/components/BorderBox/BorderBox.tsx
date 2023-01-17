import { Box, BoxProps } from '@chakra-ui/react';

export const BorderBox = (props: BoxProps) => (
  <Box bg="navy.900" borderWidth="1px" borderColor="gray.900" borderRadius="base" {...props} />
);
