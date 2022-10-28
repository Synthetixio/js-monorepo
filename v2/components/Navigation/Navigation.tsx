import { useState } from 'react';
import {
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { NetworkId, NetworkIdByName } from '@synthetixio/contracts-interface';
import {
  ChevronDown,
  ChevronUp,
  EthereumIcon,
  FailedIcon,
  GovIcon,
  GuideIcon,
  NineDots,
  LoansIcon,
  // NotificationsIcon,
  OptimismIcon,
  // SettingsIcon,
  StakingIcon,
  WalletIcon,
  StakingLogo,
  InfoOutline,
} from '@snx-v2/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatNumberToUsd, truncateAddress } from '@snx-v2/formatters';
import { UserBalances } from '@snx-v2/UserBalances';
import Wei, { wei } from '@synthetixio/wei';
import { useDebtData } from '@snx-v2/useDebtData';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { EpochPrice } from '@snx-v2/EpochPrice';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import { WalletModal } from '@snx-v2/WalletModal';

interface NavigationProps {
  currentNetwork: NetworkId;
  switchNetwork: (networkId: NetworkId) => void;
  connectWallet: () => void;
  isWalletConnected: boolean;
  walletAddress: string | null;
  isLoading: boolean;
  snxBalance: Wei;
  sUSDBalance: Wei;
  disconnectWallet: () => Promise<void>;
}

const activeIcon = (currentNetwork: NetworkId) => {
  switch (currentNetwork) {
    case 1:
      return { icon: <EthereumIcon />, name: 'Ethereum' };
    case 10:
      return { icon: <OptimismIcon />, name: 'Optimism' };
    case 5:
      return { icon: <EthereumIcon />, name: 'Goerli Testnet' };
    case 420:
      return { icon: <OptimismIcon />, name: 'Optimistic Goerli' };

    default:
      return { icon: <FailedIcon width="24px" height="24px" />, name: 'Unsupported Network' };
  }
};

export const NavigationUI = ({
  currentNetwork,
  switchNetwork,
  connectWallet,
  isWalletConnected,
  walletAddress,
  isLoading,
  snxBalance,
  sUSDBalance,
  disconnectWallet,
}: NavigationProps) => {
  const { t } = useTranslation();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { name, icon } = activeIcon(currentNetwork);
  const navigate = useNavigate();

  const size = useBreakpointValue(
    {
      base: 'mobile',
      md: 'desktop',
    },
    { fallback: 'md' }
  );

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bg={['transparent', 'transparent', 'navy.900']}
      px={[4, 4, 10]}
      py={2.5}
      borderBottom="1px"
      borderBottomColor={['transparent', 'transparent', 'gray.900']}
    >
      <Link to="/">{size === 'desktop' ? <StakingLogo /> : <StakingIcon />}</Link>
      <Flex alignItems="center">
        {isWalletConnected && walletAddress ? (
          <>
            {size === 'desktop' && (
              <UserBalances
                isLoading={isLoading}
                snxBalance={snxBalance}
                sUSDBalance={sUSDBalance}
              />
            )}
            <Center
              ml={2}
              borderColor="gray.900"
              borderWidth="1px"
              borderRadius="4px"
              height={10}
              py="6px"
              px="9.5px"
              onClick={() => console.log('Open wallet')}
              _hover={{
                bg: 'blackAlpha.400',
                cursor: 'pointer',
              }}
            >
              <WalletIcon />
              <Text ml={1} variant="nav" fontWeight={700} fontSize="12" userSelect="none">
                {truncateAddress(walletAddress, 4, 4)}
              </Text>
            </Center>
          </>
        ) : (
          <Button
            variant="connect"
            onClick={() => connectWallet()}
            sx={{ textTransform: 'capitalize' }}
          >
            {size === 'desktop'
              ? t('common.wallet.connect-wallet')
              : t('common.wallet.connect-wallet-mobile')}
          </Button>
        )}
        <Center
          ml={2}
          height={10}
          borderColor="gray.900"
          borderWidth="1px"
          borderRadius="4px"
          _hover={{
            cursor: 'pointer',
          }}
        >
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  borderRadius="4px"
                  bg="navy.900"
                  _hover={{
                    bg: 'blackAlpha.400',
                  }}
                >
                  {icon}
                  {size === 'desktop' && (
                    <>
                      <Text variant="nav" fontWeight={700} ml={1.5} mr={2}>
                        {name}
                      </Text>
                      {isOpen ? <ChevronUp color="cyan" /> : <ChevronDown color="cyan.500" />}
                    </>
                  )}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => switchNetwork(NetworkIdByName.mainnet)}>
                    <EthereumIcon />
                    <Text variant="nav" ml={2}>
                      Ethereum Mainnet
                    </Text>
                  </MenuItem>
                  <MenuItem onClick={() => switchNetwork(NetworkIdByName['mainnet-ovm'])}>
                    <OptimismIcon />
                    <Text variant="nav" ml={2}>
                      Optimism
                    </Text>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Center>
        {/* <Center
          ml={2}
          height={10}
          width={10}
          bg="navy.900"
          borderColor="gray.900"
          borderWidth="1px"
          borderRadius="4px"
          _hover={{
            bg: 'blackAlpha.400',
            cursor: 'pointer',
          }}
        >
          <NotificationsIcon color="white" />
        </Center> */}
        {/* <>
          <Center
            ml={2}
            height={10}
            width={10}
            bg="navy.900"
            borderColor="gray.900"
            borderWidth="1px"
            borderRadius="4px"
            _hover={{
              bg: 'blackAlpha.400',
              cursor: 'pointer',
            }}
          >
            <SettingsIcon color="white" />
          </Center>
        </> */}
        <Menu>
          <Center
            ml={2}
            bg="navy.900"
            height={10}
            borderColor="gray.900"
            borderWidth="1px"
            borderRadius="4px"
            _hover={{
              bg: 'blackAlpha.400',
              cursor: 'pointer',
            }}
          >
            <MenuButton>
              <NineDots />
            </MenuButton>
          </Center>
          <MenuList>
            <MenuItem onClick={() => navigate('/')}>
              <Center>
                <InfoOutline />
                <Text ml={2}>{t('common.wallet.menu.help')}</Text>
              </Center>
            </MenuItem>
            <MenuItem onClick={() => navigate('/loans')}>
              <Center>
                <LoansIcon />
                <Text ml={2}>{t('common.wallet.menu.loans')}</Text>
              </Center>
            </MenuItem>
            <MenuItem onClick={() => window.open('https://governance.synthetix.io/', '_newtab')}>
              <Center>
                <GovIcon />
                <Text ml={2}>{t('common.wallet.menu.gov')}</Text>
              </Center>
            </MenuItem>
            <MenuItem onClick={() => setIsWalletModalOpen(true)}>
              <Center>
                <WalletIcon color="white" />
                <Text ml={2}>{t('common.wallet.menu.wallet')}</Text>
              </Center>
            </MenuItem>
            {/* <MenuItem onClick={() => navigate('/')}>
              <Center>
                <SettingsIcon color="white" />
                <Text ml={2}>{t('common.wallet.menu.settings')}</Text>
              </Center>
            </MenuItem> */}
            <MenuItem onClick={() => navigate('/')}>
              <GuideIcon />
              <Text ml={2}>{t('common.wallet.menu.guide')}</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <WalletModal
        isWalletModalOpen={isWalletModalOpen}
        setIsWalletModalOpen={setIsWalletModalOpen}
        disconnectWallet={disconnectWallet}
      />
    </Flex>
  );
};

export const Navigation = ({
  currentNetwork,
  switchNetwork,
  connectWallet,
  isWalletConnected,
  walletAddress,
  disconnectWallet,
}: Omit<NavigationProps, 'snxBalance' | 'sUSDBalance' | 'isLoading'>) => {
  const { data: synthsBalances, isLoading: isSynthsLoading } = useSynthsBalances();
  const { data: debtData, isLoading: isDebtLoading } = useDebtData();
  const { data: exchangeRateData, isLoading: isExchangeRatesLoading } = useExchangeRatesData();
  const { data: feePoolData, isLoading: isFeePoolDataLoading } = useFeePoolData();

  const size = useBreakpointValue(
    {
      base: 'mobile',
      md: 'desktop',
    },
    { fallback: 'md' }
  );

  const isLoading = isSynthsLoading || isDebtLoading;
  const isEpochPriceLoading = isExchangeRatesLoading || isFeePoolDataLoading;

  const snxPrice = exchangeRateData?.SNX && formatNumberToUsd(exchangeRateData?.SNX.toString(2));

  return (
    <>
      {size === 'desktop' && (
        <EpochPrice
          isLoading={isEpochPriceLoading}
          epochEnd={feePoolData?.nextFeePeriodStartDate}
          snxPrice={snxPrice}
        />
      )}
      <NavigationUI
        currentNetwork={currentNetwork}
        switchNetwork={switchNetwork}
        connectWallet={connectWallet}
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        isLoading={isLoading}
        snxBalance={debtData?.collateral || wei(0)}
        sUSDBalance={synthsBalances?.balancesMap['sUSD']?.balance || wei(0)}
        disconnectWallet={disconnectWallet}
      />
      {size === 'mobile' && (
        <EpochPrice
          isLoading={isEpochPriceLoading}
          epochEnd={feePoolData?.nextFeePeriodStartDate}
          snxPrice={snxPrice}
        />
      )}
    </>
  );
};
