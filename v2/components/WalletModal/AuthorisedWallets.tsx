import { Box, Skeleton, Text, Link } from '@chakra-ui/react';
import { ArrowTopRight, TickIcon } from '@snx-v2/icons';
import { useAuthorisedWallets } from '@snx-v2/useAuthorisedWallets';
import { FC } from 'react';
import { Link as ReactRouterLink, NavigateFunction, useNavigate } from 'react-router-dom';
import { useDelegateWallet, DelegateWallet } from '@snx-v2/useDelegateWallet';

const AuthorisedWalletsUi: FC<{
  authorisedWallets?: DelegateWallet[];
  activeDelegateWallet: DelegateWallet | null;
  setDelegateWallet: (w: DelegateWallet | null) => void;
  isLoading: boolean;
  navigate: NavigateFunction;
}> = ({ authorisedWallets, isLoading, activeDelegateWallet, setDelegateWallet, navigate }) => {
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
      <Text mb={2}>Authorised wallets</Text>
      {authorisedWallets.map((authorisedWallet) => {
        const active = authorisedWallet.address === activeDelegateWallet?.address;
        return (
          <Text
            key={authorisedWallet.address}
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
            onClick={() => {
              setDelegateWallet(active ? null : authorisedWallet);
              navigate('/');
            }}
          >
            {active && <TickIcon />}
            {authorisedWallet.address}
            {!active && <ArrowTopRight />}
          </Text>
        );
      })}
    </>
  );
};

export const AuthorisedWallets = () => {
  const { data, isLoading } = useAuthorisedWallets();
  const { delegateWallet, setDelegateWallet } = useDelegateWallet();
  const navigate = useNavigate();
  return (
    <Box my={2} px={4} py={3} bg="black" border="1px" borderColor="gray.800" borderRadius="base">
      <AuthorisedWalletsUi
        activeDelegateWallet={delegateWallet}
        setDelegateWallet={setDelegateWallet}
        isLoading={isLoading}
        authorisedWallets={data}
        navigate={navigate}
      />
    </Box>
  );
};
