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
import { wei } from '@synthetixio/wei';
import {
  ChevronDown,
  ChevronUp,
  EthereumIcon,
  FailedIcon,
  GovIcon,
  GuideIcon,
  KebabMenu,
  LoansIcon,
  NotificationsIcon,
  OptimismIcon,
  SettingsIcon,
  StakingIcon,
  WalletIcon,
  StakingLogo,
  InfoOutline,
} from '@snx-v2/icons';
import { useTranslation } from 'react-i18next';
import { truncateAddress } from '@snx-v2/formatters';
import { UserBalances } from '@snx-v2/UserBalances';

interface NavigationProps {
  currentNetwork: NetworkId;
  switchNetwork: (networkId: NetworkId) => void;
  connectWallet: () => void;
  isWalletConnected: boolean;
  walletAddress: string | null;
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

export const Navigation = ({
  currentNetwork,
  switchNetwork,
  connectWallet,
  isWalletConnected,
  walletAddress,
}: NavigationProps) => {
  const { t } = useTranslation();

  const { name, icon } = activeIcon(currentNetwork);

  const size = useBreakpointValue({
    base: 'mobile',
    md: 'desktop',
  });

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
      {size === 'desktop' ? <StakingLogo /> : <StakingIcon />}
      <Flex alignItems="center">
        {isWalletConnected && walletAddress ? (
          <>
            {size === 'desktop' && (
              <UserBalances
                snxBalance={wei(10000.0)}
                susdBalance={wei(9999.0)}
                isSnxLoading={false}
                isSusdLoading={false}
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
            >
              <WalletIcon />
              <Text ml={1} variant="nav" fontWeight={700} fontSize="12">
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
                <MenuButton borderRadius="4px" bg="navy.900">
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
        <Center
          ml={2}
          height={10}
          width={10}
          bg="navy.900"
          borderColor="gray.900"
          borderWidth="1px"
          borderRadius="4px"
          _hover={{
            cursor: 'pointer',
          }}
        >
          <NotificationsIcon color="white" />
        </Center>
        <>
          <Center
            ml={2}
            height={10}
            width={10}
            bg="navy.900"
            borderColor="gray.900"
            borderWidth="1px"
            borderRadius="4px"
            _hover={{
              cursor: 'pointer',
            }}
          >
            <SettingsIcon color="white" />
          </Center>
        </>
        <Menu>
          <Center
            ml={2}
            bg="navy.900"
            height={10}
            borderColor="gray.900"
            borderWidth="1px"
            borderRadius="4px"
          >
            <MenuButton>
              <KebabMenu />
            </MenuButton>
          </Center>
          <MenuList>
            <MenuItem>
              <Center>
                <InfoOutline />
                <Text ml={2}>{t('common.wallet.menu.help')}</Text>
              </Center>
            </MenuItem>
            <MenuItem>
              <Center>
                <LoansIcon />
                <Text ml={2}>{t('common.wallet.menu.loans')}</Text>
              </Center>
            </MenuItem>
            <MenuItem>
              <Center>
                <GovIcon />
                <Text ml={2}>{t('common.wallet.menu.gov')}</Text>
              </Center>
            </MenuItem>
            <MenuItem>
              <Center>
                <WalletIcon color="white" />
                <Text ml={2}>{t('common.wallet.menu.wallet')}</Text>
              </Center>
            </MenuItem>
            <MenuItem>
              <Center>
                <SettingsIcon color="white" />
                <Text ml={2}>{t('common.wallet.menu.settings')}</Text>
              </Center>
            </MenuItem>
            <MenuItem>
              <GuideIcon />
              <Text ml={2}>{t('common.wallet.menu.guide')}</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
