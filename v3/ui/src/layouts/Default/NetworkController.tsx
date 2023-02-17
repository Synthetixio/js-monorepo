import {Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text} from '@chakra-ui/react';
import {ChevronDown, ChevronUp, WalletIcon} from '@snx-v3/icons';
import {
  DEFAULT_NETWORK,
  NETWORKS,
  onboard,
  UNSUPPORTED_NETWORK,
  useAccount,
  useNetwork,
} from '@snx-v3/useBlockchain';

export function NetworkController() {
  const account = useAccount();
  const activeNetwork = useNetwork();
  const selectedNetwork =
      account && activeNetwork ? activeNetwork : !account ? DEFAULT_NETWORK : UNSUPPORTED_NETWORK;
  return (
      <Flex>
        <Menu>
          {({isOpen}) => (
              <>
                <MenuButton
                    as={Button}
                    variant="outline"
                    colorScheme="gray"
                    sx={{'> span': {display: 'flex', alignItems: 'center'}}}
                    mr={1}
                >
                  <selectedNetwork.Icon />
                  <Text
                      variant="nav"
                      fontSize="sm"
                      fontWeight={700}
                      ml={1.5}
                      mr={2}
                      display={{base: 'none', md: 'initial'}}
                  >
                    {selectedNetwork.displayName}
                  </Text>
                  <Flex display={{base: 'none', md: 'initial'}}>
                    {isOpen ? <ChevronUp color="cyan" /> : <ChevronDown color="cyan.500" />}
                  </Flex>
                </MenuButton>
                <MenuList>
                  {Object.values(NETWORKS).map((network) => (
                      <MenuItem
                          key={network.name}
                          disabled={!network.isSupported}
                          onClick={async () => {
                            const success = await onboard.setChain({
                              chainId: `0x${network.id.toString(16)}`,
                            });
                            console.log({success});
                          }}
                      >
                        <network.Icon />
                        <Text variant="nav" ml={2}>
                          {network.displayName}
                        </Text>
                      </MenuItem>
                  ))}
                </MenuList>
              </>
          )}
        </Menu>
        {account ? (
            <Button
                variant="outline"
                colorScheme="gray"
                ml={2}
                height={10}
                py="6px"
                px="9.5px"
                onClick={() => {
                  // if (chain?.unsupported) {
                  //   openChainModal();
                  // } else {
                  //   openAccountModal();
                  // }
                }}
            >
              <WalletIcon />
              <Text ml={1} color="whiteAlpha.800" fontWeight={700} fontSize="xs" userSelect="none">
                {/*{account?.ensName || account.displayName}*/}
              </Text>
            </Button>
        ) : (
            <Button
                onClick={() => onboard.connectWallet()}
                type="button"
                size="sm"
                ml={2}
                py={5}
                data-testid="connect-wallet-button"
            >
              Connect Wallet
            </Button>
        )}
      </Flex>
  );

  // return (
  //   <ConnectButton.Custom>
  //     {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
  //       const network = getNetworkByName(chain?.name);
  //       );
  //     }}
  //   </ConnectButton.Custom>
  // );
}
