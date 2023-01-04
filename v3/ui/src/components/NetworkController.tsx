import { Button, Flex } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export function NetworkController() {
  const { connector } = useAccount();

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
