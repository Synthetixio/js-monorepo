import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Heading } from '@chakra-ui/react';
import { ArrowTopRight } from '@snx-v2/icons';
import { useParams, useNavigate } from 'react-router-dom';

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
const WalletUi = () => {
  const { tab = 'balances' } = useParams();
  const navigate = useNavigate();
  const tabIndex = walletPages.indexOf(tab);
  return (
    <Box>
      <Heading size="md" textAlign="center">
        My Account
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
          <Tab>Balances</Tab>
          <Tab>
            Bridge <ArrowTopRight ml={1} />
          </Tab>
          <Tab>
            Escrow <ArrowTopRight ml={1} />
          </Tab>
          <Tab>
            History <ArrowTopRight ml={1} />
          </Tab>
          <Tab>
            Delegate <ArrowTopRight ml={1} />
          </Tab>
          <Tab>
            Merge <ArrowTopRight ml={1} />
          </Tab>
          <Tab>
            Migrate Escrow <ArrowTopRight ml={1} />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Balances!</p>
          </TabPanel>
          {/* TODO tab panels as pages get rebuilt */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export const Wallet = () => {
  return <WalletUi />;
};
