import { Skeleton, Td, Tr, Box } from '@chakra-ui/react';

// A loading skeleton with dummy values
export const DashboardActionsLoading = () => {
  return (
    <Tr borderTopWidth="1px">
      <Box as={Td} border="none">
        <Skeleton startColor="gray.700" endColor="gray.900" my={2}>
          Lorem Ipsum
        </Skeleton>
      </Box>
      <Box as={Td} border="none">
        <Skeleton startColor="gray.700" endColor="gray.900" my={2}>
          Lorem Ipsum
        </Skeleton>
      </Box>
      <Box as={Td} border="none">
        <Skeleton startColor="gray.700" endColor="gray.900" my={2}>
          Lorem Ipsum
        </Skeleton>
      </Box>
      <Box as={Td} border="none">
        <Skeleton startColor="gray.700" endColor="gray.900" my={2}>
          Lorem Ipsum
        </Skeleton>
      </Box>
      <Box as={Td} border="none">
        <Skeleton startColor="gray.700" endColor="gray.900" my={2}>
          Lorem Ipsum
        </Skeleton>
      </Box>
      <Box as={Td} border="none">
        <Skeleton startColor="gray.700" endColor="gray.900" my={2}>
          Lorem Ipsum
        </Skeleton>
      </Box>
    </Tr>
  );
};
