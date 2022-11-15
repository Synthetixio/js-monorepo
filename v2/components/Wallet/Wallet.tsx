import { useContext } from 'react';
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Heading } from '@chakra-ui/react';
import { ArrowTopRight } from '@snx-v2/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { WalletBalances } from '@snx-v2/WalletBalances';
import { ContractContext } from '@snx-v2/ContractContext';
import { useTranslation } from 'react-i18next';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';

const walletPages = [
  { name: 'balances', link: '/wallet/balances', icon: false, mainnetOnly: false },
  { name: 'bridge', link: '/bridge', icon: true, mainnetOnly: false },
  { name: 'escrow', link: '/escrow', icon: true, mainnetOnly: false },
  { name: 'history', link: '/history', icon: true, mainnetOnly: false },
  { name: 'delegate', link: '/delegate', icon: true, mainnetOnly: false },
  { name: 'merge-accounts', link: '/merge-accounts', icon: true, mainnetOnly: false },
  { name: 'migrate-escrow', link: '/migrate-escrow', icon: true, mainnetOnly: true },
] as const;

const WalletUi = ({ networkId }: { networkId: number | null }) => {
  const { tab = 'balances' } = useParams();
  const navigate = useNavigate();
  const tabIndex = walletPages.findIndex(({ name }) => tab === name);
  const { t } = useTranslation();
  return (
    <Box mt={6}>
      <Heading size="md" textAlign="center">
        {t('staking-v2.wallet.my-account')}
      </Heading>
      <Tabs
        variant="solid-rounded"
        colorScheme="cyan"
        index={tabIndex}
        onChange={(tabIndex) => {
          const newTab = walletPages[tabIndex];
          navigate(newTab.link);
        }}
      >
        <TabList display="flex" justifyContent="center">
          {walletPages.map(({ name, icon, mainnetOnly }) => {
            if (mainnetOnly && networkId !== NetworkIdByName.mainnet) {
              return null;
            }
            return (
              <Tab key={name}>
                <>
                  {t(`staking-v2.wallet.tabs.${name}`)} {icon && <ArrowTopRight ml={1} />}
                </>
              </Tab>
            );
          })}
        </TabList>
        <TabPanels>
          <TabPanel paddingX={0}>
            <WalletBalances />
          </TabPanel>
          {/* TODO tab panels as pages get rebuilt */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export const Wallet = () => {
  const { networkId } = useContext(ContractContext);
  return <WalletUi networkId={networkId} />;
};
