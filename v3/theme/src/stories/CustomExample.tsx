import { Box, Button, CircularProgress, Spinner, Tooltip } from '@chakra-ui/react';

export const CustomExample = () => {
  return (
    <Box p={4} background="whiteAlpha.200">
      <Spinner />
      <Button isLoading colorScheme="gray" variant="outline">
        Loading
      </Button>
      <CircularProgress isIndeterminate />
      <Tooltip label="test" hasArrow>
        sjhdsa
      </Tooltip>
    </Box>
  );
};
