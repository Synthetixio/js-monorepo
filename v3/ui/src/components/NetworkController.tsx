import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  EthereumIcon,
  OptimismIcon,
  FailedIcon,
  ChevronUp,
  ChevronDown,
  WalletIcon,
} from '@snx-v3/icons';
import { useAccount } from '@snx-v3/useBlockchain';
import { useSwitchNetwork } from 'wagmi';

const activeIcon = (currentNetwork: number) => {
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

export function NetworkController() {
  const { address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const { name, icon } = activeIcon(chain?.id || 1);
        return (
          <Flex
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={Button}
                    variant="outline"
                    colorScheme="gray"
                    sx={{ '> span': { display: 'flex', alignItems: 'center' } }}
                    mr={1}
                  >
                    {icon}

                    <Text
                      variant="nav"
                      fontSize="sm"
                      fontWeight={700}
                      ml={1.5}
                      mr={2}
                      display={{ base: 'none', md: 'initial' }}
                    >
                      {name}
                    </Text>
                    <Flex display={{ base: 'none', md: 'initial' }}>
                      {isOpen ? <ChevronUp color="cyan" /> : <ChevronDown color="cyan.500" />}
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        if (address && switchNetwork) {
                          switchNetwork(1);
                        } else {
                          openConnectModal();
                        }
                      }}
                    >
                      <EthereumIcon />
                      <Text variant="nav" ml={2}>
                        Ethereum Mainnet
                      </Text>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        if (address && switchNetwork) {
                          switchNetwork(10);
                        } else {
                          openConnectModal();
                        }
                      }}
                    >
                      <OptimismIcon />
                      <Text variant="nav" ml={2}>
                        Optimism
                      </Text>
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
            {address && account && mounted ? (
              <Button
                variant="outline"
                colorScheme="gray"
                ml={2}
                height={10}
                py="6px"
                px="9.5px"
                onClick={() => {
                  if (chain?.unsupported) {
                    openChainModal();
                  } else {
                    openAccountModal();
                  }
                }}
              >
                <WalletIcon />
                <Text
                  ml={1}
                  color="whiteAlpha.800"
                  fontWeight={700}
                  fontSize="xs"
                  userSelect="none"
                >
                  {account?.ensName || account.displayName}
                </Text>
              </Button>
            ) : (
              <Button
                onClick={openConnectModal}
                type="button"
                size="md"
                ml={2}
                data-testid="connect-wallet-button"
              >
                Connect Wallet
              </Button>
            )}
          </Flex>
        );
      }}
    </ConnectButton.Custom>
  );
}
