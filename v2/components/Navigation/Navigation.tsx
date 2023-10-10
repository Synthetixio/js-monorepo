import { useContext, lazy, Suspense } from 'react';
import {
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  useBreakpointValue,
  useDisclosure,
  Link as ChakraLink,
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
  NotificationsIcon,
  OptimismIcon,
  // SettingsIcon,
  StakingIcon,
  WalletIcon,
  StakingLogo,
  // InfoOutline,
  InfoOutline,
} from '@snx-v2/icons';
import { Link } from 'react-router-dom';
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
import { ContractContext } from '@snx-v2/ContractContext';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { safeImport } from '@synthetixio/safe-import';
import { NotifiButton, NotifiContextWrapper } from '@snx-v2/notifiButton';

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
  ensName: string | null;
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
  ensName,
}: NavigationProps) => {
  const { t } = useTranslation();
  const { delegateWallet } = useDelegateWallet();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const notifiModal = useDisclosure();
  const { name, icon } = activeIcon(currentNetwork);

  const size = useBreakpointValue(
    {
      base: 'mobile',
      lg: 'desktop',
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
        {isWalletConnected && walletAddress && !delegateWallet && (
          <>
            {size === 'desktop' && (
              <NotifiContextWrapper>
                <NotifiButton />
              </NotifiContextWrapper>
            )}
          </>
        )}
        {isWalletConnected && walletAddress && (
          <>
            {size === 'desktop' && (
              <Flex ml={2}>
                <UserBalances
                  isLoading={isLoading}
                  snxBalance={snxBalance}
                  sUSDBalance={sUSDBalance}
                />
              </Flex>
            )}
          </>
        )}
        <Center>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  ml={2}
                  variant="outline"
                  colorScheme="gray"
                  sx={{ '> span': { display: 'flex', alignItems: 'center' } }}
                >
                  {icon}
                  {size === 'desktop' && (
                    <>
                      <Text variant="nav" fontSize="sm" fontWeight={700} ml={1.5} mr={2}>
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
        {isWalletConnected && walletAddress ? (
          <>
            <Button
              variant="outline"
              colorScheme="gray"
              ml={2}
              height={10}
              py="6px"
              px="9.5px"
              onClick={onOpen}
            >
              <WalletIcon />
              <Text
                ml={1}
                variant="nav"
                fontWeight={700}
                fontSize={{ base: 'xs', sm: 'sm' }}
                userSelect="none"
              >
                {delegateWallet
                  ? `On behalf of: ${truncateAddress(delegateWallet.address, 4, 4)}`
                  : ensName
                  ? ensName
                  : truncateAddress(walletAddress, 4, 4)}
              </Text>
            </Button>
          </>
        ) : (
          <Button
            variant="connect"
            onClick={() => connectWallet()}
            sx={{ textTransform: 'capitalize' }}
            fontSize="sm"
            ml={2}
          >
            {size === 'desktop'
              ? t('common.wallet.connect-wallet')
              : t('common.wallet.connect-wallet-mobile')}
          </Button>
        )}

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
          <Center ml={2}>
            <MenuButton
              as={Button}
              variant="outline"
              colorScheme="gray"
              data-testid="main menu button"
              p={0}
            >
              <NineDots />
            </MenuButton>
          </Center>
          <MenuList data-testid="main menu dropdown">
            {/* <MenuItem onClick={() => navigate('/')}>
              <Center>
                <InfoOutline />
                <Text ml={2}>{t('common.wallet.menu.help')}</Text>
              </Center>
            </MenuItem> */}
            {delegateWallet ? null : (
              <MenuItem
                _hover={{ textDecoration: 'none', bg: 'whiteAlpha.400' }}
                as={Link}
                to="/loans"
              >
                <Center>
                  <LoansIcon />
                  <Text fontSize="sm" ml={2}>
                    {t('common.wallet.menu.loans')}
                  </Text>
                </Center>
              </MenuItem>
            )}
            <MenuItem
              _hover={{ textDecoration: 'none', bg: 'whiteAlpha.400' }}
              as={ChakraLink}
              isExternal={true}
              href={EXTERNAL_LINKS.Synthetix.Governance}
            >
              <Center>
                <GovIcon />
                <Text fontSize="sm" ml={2}>
                  {t('common.wallet.menu.gov')}
                </Text>
              </Center>
            </MenuItem>
            {Boolean(isWalletConnected && !delegateWallet) && (
              <MenuItem as={Link} to="/wallet">
                <Center>
                  <WalletIcon color="white" />
                  <Text fontSize="sm" ml={2}>
                    {t('common.wallet.menu.wallet')}
                  </Text>
                </Center>
              </MenuItem>
            )}
            {/* <MenuItem onClick={() => navigate('/')}>
              <Center>
                <SettingsIcon color="white" />
                <Text ml={2}>{t('common.wallet.menu.settings')}</Text>
              </Center>
            </MenuItem> */}
            <MenuItem
              _hover={{ textDecoration: 'none', bg: 'whiteAlpha.400' }}
              as={ChakraLink}
              isExternal={true}
              href={EXTERNAL_LINKS.Synthetix.Docs}
            >
              <GuideIcon />
              <Text fontSize="sm" ml={2}>
                {t('common.wallet.menu.docs')}
              </Text>
            </MenuItem>
            <MenuItem as={Link} to="/terms">
              <InfoOutline width="20px" height="20px" />
              <Text fontSize="sm" ml={2}>
                {t('common.wallet.menu.terms')}
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <WalletModal isOpen={isOpen} onClose={onClose} disconnectWallet={disconnectWallet} />
    </Flex>
  );
};

export const Navigation = ({
  currentNetwork,
  switchNetwork,
  connectWallet,
  isWalletConnected,
  disconnectWallet,
}: Omit<
  NavigationProps,
  'snxBalance' | 'sUSDBalance' | 'isLoading' | 'walletAddress' | 'ensName'
>) => {
  const { data: synthsBalances, isLoading: isSynthsLoading } = useSynthsBalances();
  const { data: debtData, isLoading: isDebtLoading } = useDebtData();
  const { data: exchangeRateData, isLoading: isExchangeRatesLoading } = useExchangeRatesData();
  const { data: feePoolData, isLoading: isFeePoolDataLoading } = useFeePoolData();
  const { walletAddress, ensName } = useContext(ContractContext);
  const { delegateWallet, setDelegateWallet } = useDelegateWallet();
  const isLoading = isSynthsLoading || isDebtLoading;
  const isEpochPriceLoading = isExchangeRatesLoading || isFeePoolDataLoading;

  const snxPrice = exchangeRateData?.SNX && formatNumberToUsd(exchangeRateData?.SNX.toString(2));

  return (
    <Flex flexDir={{ base: 'column-reverse', md: 'column' }}>
      <EpochPrice
        isLoading={isEpochPriceLoading}
        epochEnd={feePoolData?.nextFeePeriodStartDate}
        snxPrice={snxPrice}
      />
      {delegateWallet && (
        <Flex
          px={[4, 4, 10]}
          bg="black"
          justifyContent="space-between"
          alignItems="center"
          height="40px"
          fontSize="xs"
        >
          <Text>You are now in delegate mode</Text>
          <Button fontSize="xs" p={0} variant="ghost" onClick={() => setDelegateWallet(null)}>
            Stop Delegate Mode
          </Button>
        </Flex>
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
        ensName={ensName}
      />
    </Flex>
  );
};
