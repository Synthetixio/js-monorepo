import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { EthereumIcon, OptimismIcon, FailedIcon, ChevronUp, ChevronDown } from '@snx-v2/icons';
import { useAccount } from '@snx-v3/useBlockchain';
import { NetworkId } from '@synthetixio/contracts-interface';
import { switchNetwork } from '@wagmi/core';

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

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        console.log('Chian is', chain);
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
                  >
                    {icon}

                    <Box display={{ base: 'none', md: 'block' }}>
                      <Text variant="nav" fontSize="sm" fontWeight={700} ml={1.5} mr={2}>
                        {name}
                      </Text>
                      {isOpen ? <ChevronUp color="cyan" /> : <ChevronDown color="cyan.500" />}
                    </Box>
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => console.log('To mainnet')}>
                      <EthereumIcon />
                      <Text variant="nav" ml={2}>
                        Ethereum Mainnet
                      </Text>
                    </MenuItem>
                    <MenuItem onClick={() => console.log('To optimism')}>
                      <OptimismIcon />
                      <Text variant="nav" ml={2}>
                        Optimism
                      </Text>
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>

            {address ? (
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={openChainModal}
                style={{ display: 'flex', alignItems: 'center' }}
                type="button"
                mr="4"
                size={['sm', 'sm', 'sm', 'md']}
              >
                {chain?.hasIcon && (
                  <span
                    style={{
                      background: chain?.iconBackground,
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      overflow: 'hidden',
                      marginRight: 8,
                    }}
                  >
                    {chain?.iconUrl && (
                      <img
                        width={20}
                        height={20}
                        alt={chain?.name ?? 'Chain icon'}
                        src={chain?.iconUrl}
                      />
                    )}
                  </span>
                )}
                {chain?.name}
              </Button>
            ) : null}
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button
                    onClick={openConnectModal}
                    type="button"
                    size={['sm', 'sm', 'sm', 'md']}
                    data-testid="connect-wallet-button"
                  >
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    colorScheme="red"
                    onClick={openChainModal}
                    type="button"
                    size={['sm', 'sm', 'sm', 'md']}
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <Button
                  colorScheme="gray"
                  onClick={openAccountModal}
                  type="button"
                  size={['sm', 'sm', 'sm', 'md']}
                  data-testid="account-button"
                >
                  {account.displayName}
                </Button>
              );
            })()}
          </Flex>
        );
      }}
    </ConnectButton.Custom>
  );
}
