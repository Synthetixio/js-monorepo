import { Box, Skeleton, Text, Link } from '@chakra-ui/react';
import { ArrowTopRight } from '@snx-v2/icons';
import { useDelegateWallets } from '@snx-v2/useDelegateWallets';
import { FC } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const DelegatedWalletsUi: FC<{ delegatedWallets?: { address: string }[]; isLoading: boolean }> = ({
  delegatedWallets,
  isLoading,
}) => {
  if (isLoading) {
    return <Skeleton h={6} w="full" />;
  }
  if (!delegatedWallets?.length) {
    return (
      <>
        <Text>No wallet delegation exists.</Text>
        <Text>
          Go to{' '}
          <Link color="cyan" as={ReactRouterLink} to="/delegate">
            Delegate
          </Link>{' '}
          to set it up
        </Text>
      </>
    );
  }
  return (
    <>
      <Text mb={2}>Delegated wallets</Text>
      {delegatedWallets.map(({ address }) => {
        return (
          <Text
            key={address}
            py={2}
            bg="black"
            border="1px"
            borderColor="gray.800"
            borderLeft="none"
            borderRight="none"
            borderTop="none"
            fontSize="sm"
            cursor="pointer"
            display="flex"
            alignItems="center"
            gap={1}
          >
            {address}
            <ArrowTopRight />
          </Text>
        );
      })}
    </>
  );
};

export const DelegatedWallets = () => {
  const { data, isLoading } = useDelegateWallets();
  return (
    <Box my={2} px={4} py={3} bg="black" border="1px" borderColor="gray.800" borderRadius="base">
      <DelegatedWalletsUi isLoading={isLoading} delegatedWallets={data} />
    </Box>
  );
};
