import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { ChevronDown, ChevronUp, WalletIcon } from '@snx-v3/icons';
import {
  DEFAULT_NETWORK,
  NETWORKS,
  onboard,
  UNSUPPORTED_NETWORK,
  useAccount,
  useNetwork,
  disconnect,
} from '@snx-v3/useBlockchain';
import { prettyString } from '@snx-v3/format';

export function NetworkController() {
  const account = useAccount();
  const activeNetwork = useNetwork();
  const selectedNetwork =
    account && activeNetwork ? activeNetwork : !account ? DEFAULT_NETWORK : UNSUPPORTED_NETWORK;
  return (
    <Flex>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              isDisabled={!Boolean(account)}
              variant="outline"
              colorScheme="gray"
              sx={{ '> span': { display: 'flex', alignItems: 'center' } }}
              mr={1}
            >
              <selectedNetwork.Icon />
              <Text
                variant="nav"
                fontSize="sm"
                fontWeight={700}
                ml={1.5}
                mr={2}
                display={{ base: 'none', md: 'initial' }}
              >
                {selectedNetwork.displayName}
              </Text>
              <Flex display={{ base: 'none', md: 'initial' }}>
                {isOpen ? <ChevronUp color="cyan" /> : <ChevronDown color="cyan.500" />}
              </Flex>
            </MenuButton>
            <MenuList>
              {Object.values(NETWORKS).map((network) => (
                <MenuItem
                  key={network.name}
                  disabled={!network.isSupported}
                  onClick={async () => {
                    await onboard.setChain({ chainId: `0x${network.id.toString(16)}` });
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
        <Menu>
          <MenuButton
            as={Button}
            variant="outline"
            colorScheme="gray"
            ml={2}
            height={10}
            py="6px"
            px="9.5px"
            whiteSpace="nowrap"
          >
            <WalletIcon />
            <Text
              as="span"
              ml={1}
              color="whiteAlpha.800"
              fontWeight={700}
              fontSize="xs"
              userSelect="none"
            >
              {account.ens?.name || prettyString(account.address)}
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                try {
                  navigator.clipboard.writeText(account?.address);
                } catch (_e) {}
              }}
            >
              <Text variant="nav" ml={2}>
                Copy address
              </Text>
            </MenuItem>
            <MenuItem onClick={disconnect}>
              <Text variant="nav" ml={2}>
                Disconnect
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
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
}
