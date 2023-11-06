import { FC, useContext, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
  Avatar,
  Tooltip,
} from '@chakra-ui/react';
import { ContractContext } from '@snx-v2/ContractContext';
import { truncateAddress } from '@synthetixio/formatters';
import { CopyIcon, OpenInNew } from '@snx-v2/icons';
import { getEtherscanBaseUrl } from '@snx-v2/txnLink';
import { useNavigate } from 'react-router-dom';
import { theme } from '@synthetixio/v3-theme';
import { useTranslation } from 'react-i18next';
import { Balances, BalancesProps } from './Balances';
import { AuthorisedWallets, AuthorisedWalletsProps } from './AuthorisedWallets';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';

export const WalletModalUi: FC<{
  isOpen: boolean;
  onClose: () => void;
  disconnectWallet: () => Promise<void>;
  walletType: string | null;
  ensName: string | null;
  walletAddress: string | null;
  networkId: number | null;
  Balances: FC<BalancesProps>;
  AuthorisedWallets: FC<AuthorisedWalletsProps>;
}> = ({
  isOpen,
  onClose,
  disconnectWallet,
  networkId,
  walletAddress,
  Balances,
  walletType,
  ensName,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasCopied, onCopy } = useClipboard(walletAddress || '');
  const { delegateWallet, setDelegateWallet } = useDelegateWallet();
  const { hasCopied: hasCopiedDelegated, onCopy: onCopyDelegated } = useClipboard(
    delegateWallet?.address || ''
  );
  const [showDelegateWallets, setShowDelegateWallet] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShowDelegateWallet(false);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent
        bg="gray.900"
        bgGradient={theme.gradients['dark'][500]}
        pt="10"
        pb="3"
        borderWidth="1px"
        borderColor="gray.900"
        data-testid="transaction modal"
      >
        <ModalCloseButton />
        <ModalHeader fontWeight={700} fontSize="xl" pb={0} textAlign="center">
          {t('staking-v2.wallet-modal.headline')}
        </ModalHeader>
        <ModalBody>
          <Box p={4} bg="black" border="1px" borderColor="gray.800" borderRadius="base">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="sm" color="gray.800">
                {t('staking-v2.wallet-modal.connected-with', { walletType })}
              </Text>
              <Button
                size="xs"
                onClick={() => {
                  onClose();
                  setShowDelegateWallet(false);
                  disconnectWallet();
                  navigate('/');
                }}
                variant="outline"
              >
                {t('staking-v2.wallet-modal.disconnect')}
              </Button>
            </Flex>
            <Flex alignItems="center" my={1}>
              <Avatar bg="gray.200" height="24px" width="24px" mr={2} />
              {ensName
                ? ensName
                : walletAddress && (
                    <Tooltip label={walletAddress}>{truncateAddress(walletAddress)}</Tooltip>
                  )}
            </Flex>
            {delegateWallet && (
              <Flex alignItems="center" my={1}>
                On behalf of:
                <Tooltip label={delegateWallet.address}>
                  {truncateAddress(delegateWallet.address)}
                </Tooltip>
              </Flex>
            )}
            <Flex mt={2} justifyContent="space-between" flexFlow="wrap">
              <Button size="xs" fontWeight={400} variant="ghost" onClick={onCopy}>
                <CopyIcon mr={1} /> {hasCopied ? 'Copied' : 'Copy Address'}
              </Button>
              {delegateWallet && (
                <Button size="xs" fontWeight={400} variant="ghost" onClick={onCopyDelegated}>
                  <CopyIcon mr={1} /> {hasCopiedDelegated ? 'Copied' : 'Copy On Behalf'}
                </Button>
              )}
              <Link
                display="flex"
                alignItems="center"
                textColor="cyan.400"
                fontSize="xs"
                fontWeight={400}
                isExternal
                href={`${networkId && getEtherscanBaseUrl(networkId)}/address/${walletAddress}`}
              >
                <OpenInNew mr={1} />
                {t('staking-v2.wallet-modal.explorer')}
              </Link>
            </Flex>
          </Box>
          {showDelegateWallets && !delegateWallet ? (
            <AuthorisedWallets
              onWalletSelected={(wallet) => {
                setShowDelegateWallet(false);
                setDelegateWallet(wallet);
                onClose();
                navigate('/');
              }}
            />
          ) : (
            <Balances onClose={onClose} />
          )}

          <Divider my={4} />
          {delegateWallet ? null : (
            <Button
              w="full"
              onClick={() => {
                onClose();
                setShowDelegateWallet(false);
                navigate('/wallet/balances');
              }}
              margin="0 auto"
              display="block"
            >
              {t('staking-v2.wallet-modal.manage')}
            </Button>
          )}
          <Button
            mt={4}
            w="full"
            variant="outline"
            onClick={() => {
              if (delegateWallet) {
                setDelegateWallet(null);
                return;
              }
              setShowDelegateWallet((x) => !x);
            }}
            display="block"
          >
            {delegateWallet
              ? 'Stop Delegate Mode'
              : showDelegateWallets
              ? 'Cancel'
              : t('staking-v2.wallet-modal.delegate-mode')}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const WalletModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  disconnectWallet: () => Promise<void>;
}> = (props) => {
  const { walletAddress, networkId, walletType, ensName } = useContext(ContractContext);

  return (
    <WalletModalUi
      {...props}
      ensName={ensName}
      walletType={walletType}
      Balances={Balances}
      AuthorisedWallets={AuthorisedWallets}
      walletAddress={walletAddress}
      networkId={networkId}
    />
  );
};
