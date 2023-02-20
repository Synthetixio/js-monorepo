import { Box, Skeleton, Text, Link, Avatar, Button, Tooltip } from '@chakra-ui/react';
import { useAuthorisedWallets } from '@snx-v2/useAuthorisedWallets';
import { FC } from 'react';
import { Link as ReactRouterLink, NavigateFunction, useNavigate } from 'react-router-dom';
import { useDelegateWallet, DelegateWallet } from '@snx-v2/useDelegateWallet';
import { truncateAddress } from '@snx-v2/formatters';

const AuthorisedWalletsUi: FC<{
  authorisedWallets?: DelegateWallet[];
  setDelegateWallet: (w: DelegateWallet | null) => void;
  isLoading: boolean;
  navigate: NavigateFunction;
}> = ({ authorisedWallets, isLoading, setDelegateWallet, navigate }) => {
  if (isLoading) {
    return <Skeleton h={6} w="full" />;
  }
  if (!authorisedWallets?.length) {
    return (
      <>
        <Text>This wallet have not been authorized to perform action on any other wallet.</Text>
        <Text>
          Connect the wallet you want to perform actions on and Go to{' '}
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
      <Text mb={2}>Authorised wallet(s)</Text>
      {authorisedWallets.map((authorisedWallet) => {
        return (
          <Text
            key={authorisedWallet.address}
            py={2}
            bg="black"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="md" fontWeight={800}>
              <Avatar bg="gray.200" height="24px" width="24px" mr={2} />
              <Tooltip label={authorisedWallet.address}>
                {truncateAddress(authorisedWallet.address, 5, 5)}
              </Tooltip>
            </Text>
            <Button
              size="xs"
              onClick={() => {
                setDelegateWallet(authorisedWallet);
                navigate('/');
              }}
              variant="outline"
            >
              Select
            </Button>
          </Text>
        );
      })}
    </>
  );
};

export const AuthorisedWallets = () => {
  const { data, isLoading } = useAuthorisedWallets();
  const { setDelegateWallet } = useDelegateWallet();
  const navigate = useNavigate();
  return (
    <Box my={2} px={4} py={3} bg="black" border="1px" borderColor="gray.800" borderRadius="base">
      <AuthorisedWalletsUi
        setDelegateWallet={setDelegateWallet}
        isLoading={isLoading}
        authorisedWallets={data}
        navigate={navigate}
      />
    </Box>
  );
};
