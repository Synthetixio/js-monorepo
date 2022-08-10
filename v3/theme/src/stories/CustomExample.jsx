import { Box, Text, Button } from '@chakra-ui/react';
import React from 'react';

export const CustomExample = ({ content, buttonLabel, ...props }) => {
  return (
    <Box p={4} background={'whiteAlpha.200'}>
      <Text mb={2}>{content}</Text>
      <Button {...props}>{buttonLabel}</Button>
    </Box>
  );
};
