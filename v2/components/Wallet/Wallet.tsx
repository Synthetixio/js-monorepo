import { useContext } from 'react';
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Heading } from '@chakra-ui/react';
import { ArrowTopRight } from '@snx-v2/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { WalletBalances } from '@snx-v2/WalletBalances';
import { ContractContext } from '@snx-v2/ContractContext';
import { useTranslation } from 'react-i18next';

const walletPages = [
  'balances',
  'bridge',
  'escrow',
  'history',
  'delegate',
  'merge-accounts',
  'migrate-escrow',
];
const pagesStillUsingOldDesign = [
  'bridge',
  'escrow',
  'history',
  'delegate',
  'merge-accounts',
  'migrate-escrow',
];
const WalletUi = ({ networkId }: { networkId: number | null }) => {
  const { tab = 'balances' } = useParams();
  const navigate = useNavigate();
  const tabIndex = walletPages.indexOf(tab);
  const { t } = useTranslation();
  return (
    <Box mt={6}>
      <Heading size="md" textAlign="center">
        {t('staking-v2.wallet.my-account')}
      </Heading>
      <Tabs
        variant="soft-rounded"
        colorScheme="cyan"
        index={tabIndex}
        onChange={(tabIndex) => {
          const newTab = walletPages[tabIndex];
          if (pagesStillUsingOldDesign.includes(newTab)) {
            navigate(`/${newTab}`);
          } else {
            navigate(`/wallet/${newTab}`);
          }
        }}
      >
        <TabList display="flex" justifyContent="center">
          <Tab>{t('staking-v2.wallet.tabs.balances')}</Tab>
          <Tab>
            {t('staking-v2.wallet.tabs.bridge')} <ArrowTopRight ml={1} />
          </Tab>
          <Tab>
            {t('staking-v2.wallet.tabs.escrow')} <ArrowTopRight ml={1} />
          </Tab>
          <Tab>
            {t('staking-v2.wallet.tabs.history')} <ArrowTopRight ml={1} />
          </Tab>
          <Tab>
            {t('staking-v2.wallet.tabs.delegate')} <ArrowTopRight ml={1} />
          </Tab>
          <Tab>
            {t('staking-v2.wallet.tabs.merge')} <ArrowTopRight ml={1} />
          </Tab>
          {networkId === 1 && (
            <Tab>
              {t('staking-v2.wallet.tabs.merge')} <ArrowTopRight ml={1} />
            </Tab>
          )}
        </TabList>
        <TabPanels>
          <TabPanel>
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
