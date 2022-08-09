import React from 'react';
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRecoilState } from 'recoil';
import { useAccount, useNetwork } from 'wagmi';
import { routeToChain } from './NetworkChain';
import { useLocation } from 'react-router-dom';
import { chainIdState } from '../utils/state';
import { supportedChains } from '../utils/constants';

export function NetworkController() {
  const { connector } = useAccount();
  const location = useLocation();
  const { chains: networkChains } = useNetwork();
  const [localChainId] = useRecoilState(chainIdState);

  const chains = networkChains.length ? networkChains : supportedChains;
  const localChain = chains.find((chain) => chain.id === localChainId);

  return (
    <ConnectButton.Custom>
      {(data) => {
        const { account, chain, openAccountModal, openChainModal, openConnectModal, mounted } =
          data;

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
                bg="gray.800"
                _hover={{ bg: 'gray.700' }}
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
                  bg="gray.800"
                  _hover={{ bg: 'gray.700' }}
                  _active={{ bg: 'gray.700' }}
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
                  {chain?.name || localChain?.name}
                </MenuButton>
                <MenuList px={2} minW="0" bg="black" border="1px solid rgba(255,255,255,0.33)">
                  {chains &&
                    chains.map((chainOption) => (
                      <MenuItem
                        borderRadius="sm"
                        key={chainOption.id}
                        alignItems="left"
                        mb={1}
                        flexDirection="column"
                        _hover={{ bg: 'gray.800' }}
                        _focus={{ bg: 'gray.800' }}
                        _active={{ bg: 'gray.800' }}
                        onClick={() => {
                          routeToChain(location.pathname, chainOption.id);
                        }}
                        fontWeight="600"
                      >
                        {/* chainOption.hasIcon && (
                          <div
                            style={{
                              background: chainOption.iconBackground,
                              width: 20,
                              height: 20,
                              borderRadius: 999,
                              overflow: 'hidden',
                              marginRight: 8,
                            }}
                          >
                            {chainOption.iconUrl && (
                              <img
                                alt={chainOption.name ?? 'Chain icon'}
                                src={chainOption.iconUrl}
                                style={{ width: 20, height: 20 }}
                              />
                            )}
                          </div>
                            ) */}
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
                    colorScheme="blue"
                    onClick={openConnectModal}
                    type="button"
                    size={['sm', 'sm', 'sm', 'md']}
                  >
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button colorScheme="red" onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                );
              }
              return (
                <Button
                  bg="gray.800"
                  _hover={{ bg: 'gray.700' }}
                  onClick={openAccountModal}
                  type="button"
                >
                  {account.displayName}
                  {false && account?.displayBalance ? ` (${account?.displayBalance})` : ''}
                </Button>
              );
            })()}
          </Flex>
        );
      }}
    </ConnectButton.Custom>
  );
}
