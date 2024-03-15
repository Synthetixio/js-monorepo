import type { FC, PropsWithChildren } from 'react';
import { useContext } from 'react';
import { Box, Button, ButtonGroup, Flex, Heading } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { ContractContext } from '@snx-v2/ContractContext';
import { useTranslation } from 'react-i18next';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';

const WalletTab: FC<PropsWithChildren<{ to: string }>> = ({ to, children }) => {
  const location = useLocation();
  return (
    <Button
      as={Link}
      to={to}
      aria-selected={location.pathname === to ? 'true' : 'false'}
      variant={location.pathname === to ? 'solid' : 'ghost'}
      borderRadius="9999px"
      backgroundImage="none"
      _hover={{ backgroundImage: 'none' }}
      _active={{ backgroundImage: 'none' }}
      _selected={{ color: 'black' }}
    >
      {children}
    </Button>
  );
};

const WalletLayoutUi = ({
  networkId,
  children,
}: PropsWithChildren<{ networkId: number | null }>) => {
  const { t } = useTranslation();
  const isL1 = networkId === NetworkIdByName.mainnet || networkId === NetworkIdByName.goerli;
  return (
    <Box mt={6}>
      <Heading size="md" textAlign="left">
        {t('staking-v2.wallet.my-wallet')}
      </Heading>
      <ButtonGroup py={5} spacing={1} display="flex" justifyContent="space-between">
        <Flex alignItems="center" gap={1} flexWrap="wrap">
          <WalletTab to="/wallet/balances">{t(`staking-v2.wallet.tabs.balances`)}</WalletTab>
          <WalletTab to="/escrow">{t(`staking-v2.wallet.tabs.escrow`)}</WalletTab>
          <WalletTab to="/history">{t(`staking-v2.wallet.tabs.history`)}</WalletTab>
          <WalletTab to="/delegate">{t(`staking-v2.wallet.tabs.delegate`)}</WalletTab>
          <WalletTab to="/merge-accounts">{t(`staking-v2.wallet.tabs.merge-accounts`)}</WalletTab>
          {isL1 ? (
            <WalletTab to="/migrate-escrow">{t(`staking-v2.wallet.tabs.migrate-escrow`)}</WalletTab>
          ) : null}
          {isL1 ? (
            <WalletTab to="/migrate-debt">{t(`staking-v2.wallet.tabs.migrate-debt`)}</WalletTab>
          ) : null}
        </Flex>
        <WalletTab to="/bridge">{t(`staking-v2.wallet.tabs.bridge`)}</WalletTab>
      </ButtonGroup>

      {children}
    </Box>
  );
};
export const WalletLayout: FC<PropsWithChildren> = ({ children }) => {
  const { networkId } = useContext(ContractContext);
  return <WalletLayoutUi networkId={networkId}>{children}</WalletLayoutUi>;
};
