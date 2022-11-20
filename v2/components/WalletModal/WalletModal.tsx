import { FC, useContext, ReactElement } from 'react';
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
  Image,
} from '@chakra-ui/react';
import { ContractContext } from '@snx-v2/ContractContext';
import { formatNumber, formatNumberToUsd, truncateAddress } from '@snx-v2/formatters';
import { CopyIcon, OpenInNew, SNXIcon } from '@snx-v2/icons';
import { getEtherscanBaseUrl } from '@snx-v2/txnLink';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useNavigate } from 'react-router-dom';
import { theme } from '@synthetixio/v3-theme';
import { useTranslation } from 'react-i18next';
import { useGetSynthsByName } from '@snx-v2/synthsByName';
import { getPngSynthIconUrl } from '@snx-v2/SynthIcons';
import { LOCAL_STORAGE_KEYS } from '@snx-v2/Constants';

type BalanceObject = {
  currencyKey: string;
  balance: number;
  usdBalance: number;
  icon?: ReactElement;
  description?: string;
};

export const WalletModalUi: FC<{
  isOpen: boolean;
  onClose: () => void;
  disconnectWallet: () => Promise<void>;
  walletType: string | null;
  ensName: string | null;
  walletAddress: string | null;
  networkId: number | null;
  balances?: BalanceObject[];
}> = ({
  isOpen,
  onClose,
  disconnectWallet,
  networkId,
  walletAddress,
  balances,
  walletType,
  ensName,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasCopied, onCopy } = useClipboard(walletAddress || '');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Box
            my={2}
            px={4}
            py={3}
            bg="black"
            border="1px"
            borderColor="gray.800"
            borderRadius="base"
          >
            {balances?.map(({ usdBalance, balance, icon, currencyKey, description }) => {
              return (
                <Flex my={2} key={currencyKey} alignItems="center" justifyContent="space-between">
                  <Flex>
                    <Flex display="flex" alignItems="center" mr={1}>
                      {icon}
                    </Flex>
                    <Flex ml={1} flexDirection="column">
                      <Text fontSize="sm" lineHeight="shorter">
                        {currencyKey}
                      </Text>
                      {description && (
                        <Text fontSize="xs" mt={0.1} color="gray.800">
                          {description}
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                  <Flex flexDirection="column">
                    <Text fontSize="sm" textAlign="right">
                      {formatNumber(balance)}
                    </Text>
                    <Text fontSize="xs" color="gray.800" textAlign="right">
                      {formatNumberToUsd(usdBalance)}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
            <Button
              display="block"
              width="100%"
              variant="ghost"
              onClick={() => {
                onClose();
                navigate('/wallet');
              }}
              margin="0 auto"
            >
              {t('staking-v2.wallet-modal.view-all')}
            </Button>
          </Box>
          <Divider my={4} />
          <Button
            w="full"
            onClick={() => {
              onClose();
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
              window.localStorage[LOCAL_STORAGE_KEYS.STAKING_V2_ENABLED] = 'false';
              window.location.href = window.location.origin + '/?delegateModalOpen=true';
            }}
            display="block"
          >
            {t('staking-v2.wallet-modal.delegate-mode')}
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

  const { data: synthBalancesData } = useSynthsBalances();
  const { data: debtData } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: synthByNameData } = useGetSynthsByName();

  const snxBalance: BalanceObject | undefined =
    debtData && exchangeRateData
      ? {
          currencyKey: 'SNX',
          balance: debtData.collateral.toNumber(),
          usdBalance: debtData.collateral.mul(exchangeRateData.SNX || 0).toNumber(),
          icon: <SNXIcon width="34px" height="34px" />,
          description: 'Synthetix Network Token',
        }
      : undefined;

  const synthBalances = synthBalancesData?.balances.slice(0, 5).map((x) => {
    const assetDescription = synthByNameData?.SynthsByName?.[x.currencyKey]?.description;
    const description = assetDescription ? `Synthetic ${assetDescription}` : undefined;
    return {
      currencyKey: x.currencyKey,
      balance: x.balance.toNumber(),
      usdBalance: x.usdBalance.toNumber(),
      icon: (
        <Image
          width="34px"
          height="34px"
          alt={x.currencyKey}
          src={getPngSynthIconUrl(x.currencyKey)}
        />
      ),
      description,
    };
  });

  const balances = snxBalance && synthBalances ? [snxBalance].concat(synthBalances) : undefined;

  return (
    <WalletModalUi
      {...props}
      ensName={ensName}
      walletType={walletType}
      balances={balances}
      walletAddress={walletAddress}
      networkId={networkId}
    />
  );
};
