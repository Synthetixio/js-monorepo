import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

export function NetworkController() {
  const { connector } = useAccount();
  const { chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
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
            {connector ? (
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
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  textAlign="left"
                  colorScheme="gray"
                  mr="4"
                  style={{ display: 'flex', alignItems: 'center' }}
                  size={['sm', 'sm', 'sm', 'md']}
                >
                  {chain?.hasIcon && (
                    <div
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
                          height={20}
                          width={20}
                          alt={chain?.name ?? 'Chain icon'}
                          src={chain?.iconUrl}
                        />
                      )}
                    </div>
                  )}
                  {chain?.name}
                </MenuButton>
                <MenuList px={2} minW="0" bg="black" border="1px solid rgba(255,255,255,0.33)">
                  {chains.map((chainOption) => (
                    <MenuItem
                      borderRadius="sm"
                      key={chainOption.id}
                      alignItems="left"
                      mb={1}
                      flexDirection="column"
                      _hover={{ bg: 'gray.900' }}
                      _focus={{ bg: 'gray.900' }}
                      _active={{ bg: 'gray.900' }}
                      onClick={() => {
                        // TODO: 1. ask wallet to switch chain, if connected
                        // TODO: 2. if not connected, update wagmi chain
                        if (switchNetwork) {
                          switchNetwork(chainOption.id);
                        }
                      }}
                      fontWeight="600"
                    >
                      {chainOption.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
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
