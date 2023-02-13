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
} from '@chakra-ui/react';
import { ContractContext } from '@snx-v2/ContractContext';
import { truncateAddress } from '@snx-v2/formatters';
import { CopyIcon, OpenInNew } from '@snx-v2/icons';
import { getEtherscanBaseUrl } from '@snx-v2/txnLink';
import { useNavigate } from 'react-router-dom';
import { theme } from '@synthetixio/v3-theme';
import { useTranslation } from 'react-i18next';
import { Balances } from './Balances';
import { DelegatedWallets } from './DelegatedWallets';

export const WalletModalUi: FC<{
  isOpen: boolean;
  onClose: () => void;
  disconnectWallet: () => Promise<void>;
  walletType: string | null;
  ensName: string | null;
  walletAddress: string | null;
  networkId: number | null;
  Balances: FC;
  DelegatedWallets: FC;
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
              {ensName ? ensName : walletAddress && truncateAddress(walletAddress)}
            </Flex>
            <Flex mt={2}>
              <Button size="xs" fontWeight={400} variant="ghost" onClick={onCopy}>
                <CopyIcon mr={1} /> {hasCopied ? 'Copied' : 'Copy Address'}
              </Button>
              <Link
                ml={3}
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
          {showDelegateWallets ? <DelegatedWallets /> : <Balances />}

          <Divider my={4} />
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
          <Button
            mt={4}
            w="full"
            variant="outline"
            onClick={() => {
              setShowDelegateWallet((x) => !x);
            }}
            display="block"
          >
            {showDelegateWallets ? 'Back' : t('staking-v2.wallet-modal.delegate-mode')}
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
      DelegatedWallets={DelegatedWallets}
      walletAddress={walletAddress}
      networkId={networkId}
    />
  );
};
