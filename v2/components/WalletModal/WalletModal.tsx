import { FC, useContext, ReactElement } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import { ContractContext } from '@snx-v2/ContractContext';
import { formatNumber, formatNumberToUsd, truncateAddress } from '@snx-v2/formatters';
import { AvatarIcon, CopyIcon, SNXIcon } from '@snx-v2/icons';
import { ExternalLink } from '@snx-v2/ExternalLink';
import { getEtherscanBaseUrl } from '@snx-v2/txnLink';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import Wei from '@synthetixio/wei';
import { useNavigate } from 'react-router-dom';
import { theme } from '@synthetixio/v3-theme';
import { useTranslation } from 'react-i18next';

type BalanceObject = {
  currencyKey: string;
  balance: Wei;
  usdBalance: Wei;
  icon?: ReactElement;
};
export const WalletModalUi: FC<{
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (x: boolean) => void;
  disconnectWallet: () => Promise<void>;
  walletAddress: string | null;
  networkId: number | null;
  balances?: BalanceObject[];
}> = ({
  isWalletModalOpen,
  setIsWalletModalOpen,
  disconnectWallet,
  networkId,
  walletAddress,
  balances,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasCopied, onCopy } = useClipboard(walletAddress || '');

  return (
    <Modal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)}>
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
            <Flex alignItems="center" justifyContent="space-between">
              <Flex>
                <AvatarIcon mr={2} /> {walletAddress && truncateAddress(walletAddress)}
              </Flex>
              <Button onClick={() => disconnectWallet()} variant="ghost">
                {t('staking-v2.wallet-modal.disconnect')}
              </Button>
            </Flex>
            <Flex>
              <Button fontSize="sm" fontWeight={400} variant="ghost" onClick={onCopy}>
                <CopyIcon mr={2} /> {hasCopied ? 'Copied' : 'Copy Address'}
              </Button>

              <ExternalLink
                fontSize="sm"
                fontWeight={400}
                href={`${networkId && getEtherscanBaseUrl(networkId)}/account/${walletAddress}`}
              >
                {t('staking-v2.wallet-modal.explorer')}
              </ExternalLink>
            </Flex>
          </Box>
          <Box mt={4} p={4} bg="black" border="1px" borderColor="gray.800" borderRadius="base">
            {balances?.map(({ usdBalance, balance, icon, currencyKey }) => {
              return (
                <Flex justifyContent="space-between">
                  <Flex display="flex" alignItems="center">
                    {icon} <Text ml={1}>{currencyKey}</Text>
                  </Flex>
                  <Flex flexDirection="column">
                    <Text textAlign="right">{formatNumber(balance.toNumber())}</Text>
                    <Text color="gray.800" textAlign="right">
                      {formatNumberToUsd(usdBalance.toNumber())}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
            <Button
              display="block"
              variant="ghost"
              onClick={() => navigate('/synths')}
              margin="0 auto"
            >
              {t('staking-v2.wallet-modal.view-all')}
            </Button>
          </Box>
          <Divider my={4} />
          <Button onClick={() => navigate('/escrow')} margin="0 auto" display="block">
            {t('staking-v2.wallet-modal.escrow')}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
const getSynthIcon = (currencyKey: string) =>
  `https://raw.githubusercontent.com/Synthetixio/synthetix-assets/master/synths/${currencyKey}.svg`;

export const WalletModal: FC<{
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (x: boolean) => void;
  disconnectWallet: () => Promise<void>;
}> = (props) => {
  const { data: synthBalancesData } = useSynthsBalances();
  const { data: debtData } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();
  const { walletAddress, networkId } = useContext(ContractContext);
  const snxBalance =
    debtData && exchangeRateData
      ? {
          currencyKey: 'SNX',
          balance: debtData.collateral,
          usdBalance: debtData.collateral.mul(exchangeRateData.SNX || 0),
          icon: <SNXIcon />,
        }
      : undefined;

  const synthBalances = synthBalancesData?.balances.slice(0, 5).map((x) => ({
    ...x,
    icon: <img width="24px" height="24px" src={getSynthIcon(x.currencyKey)} />,
  }));
  const balances = snxBalance && synthBalances ? [snxBalance].concat(synthBalances) : undefined;
  return (
    <WalletModalUi
      {...props}
      balances={balances}
      walletAddress={walletAddress}
      networkId={networkId}
    />
  );
};
