import { Box, Skeleton, Text, Avatar, Button, Tooltip } from '@chakra-ui/react';
import { useAuthorisedWallets } from '@snx-v2/useAuthorisedWallets';
import { FC, PropsWithChildren } from 'react';

import { DelegateWallet } from '@snx-v2/useDelegateWallet';
import { truncateAddress } from '@snx-v2/formatters';

const StyledBox: FC<PropsWithChildren> = ({ children }) => (
  <Box my={2} px={4} py={3} bg="black" border="1px" borderColor="gray.800" borderRadius="base">
    {children}
  </Box>
);

const AuthorisedWalletsUi: FC<{
  authorisedWallets?: DelegateWallet[];
  isLoading: boolean;
  onWalletSelected: (wallet: DelegateWallet | null) => void;
}> = ({ onWalletSelected, authorisedWallets, isLoading }) => {
  if (isLoading) {
    return (
      <StyledBox>
        <Skeleton h={6} w="full" />
      </StyledBox>
    );
  }

  return (
    <StyledBox>
      <Text mb={2}>Authorised wallet(s)</Text>

      {(authorisedWallets || [])
        .concat({
          address: '0x99f4176ee457afedffcb1839c7ab7a030a5e4a92',
          canAll: true,
          canMint: true,
          canBurn: true,
          canClaim: true,
          canExchange: true,
        })
        .map((authorisedWallet) => {
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
                onClick={() => onWalletSelected(authorisedWallet)}
                variant="outline"
              >
                Select
              </Button>
            </Text>
          );
        })}
    </StyledBox>
  );
};

export type AuthorisedWalletsProps = {
  onWalletSelected: (wallet: DelegateWallet | null) => void;
};
export const AuthorisedWallets: FC<AuthorisedWalletsProps> = ({ onWalletSelected }) => {
  const { data, isLoading } = useAuthorisedWallets();
  return (
    <AuthorisedWalletsUi
      isLoading={isLoading}
      authorisedWallets={data}
      onWalletSelected={onWalletSelected}
    />
  );
};
