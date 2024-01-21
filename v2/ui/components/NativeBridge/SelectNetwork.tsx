import ArrowsSwap from 'assets/svg/app/arrows-swap.svg';
import { NetworkId, NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { ChevronDown, ChevronUp, EthereumIcon, FailedIcon, OptimismIcon } from '@snx-v2/icons';

import { IconButton } from '@snx-v1/styles';
import { Trans } from 'react-i18next';

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

function SelectNetwork({
  isMainnet,
  isL2,
  isWalletConnected,
  networkId,
  switchNetwork,
}: {
  isMainnet: boolean;
  isL2: boolean;
  isWalletConnected: boolean;
  networkId: NetworkId;
  switchNetwork: (networkId: NetworkId) => Promise<boolean | undefined>;
}) {
  const ethNetworkId = isMainnet ? NetworkIdByName.mainnet : NetworkIdByName.goerli;
  const opNetworkId = isMainnet ? NetworkIdByName['mainnet-ovm'] : NetworkIdByName['goerli-ovm'];
  const { name, icon } = activeIcon(networkId);
  const { name: ethName, icon: ethIcon } = activeIcon(ethNetworkId);
  const { name: opName, icon: opIcon } = activeIcon(opNetworkId);

  const switchMenuNetwork = async (toNetworkId: NetworkId) => {
    if (toNetworkId === networkId) return;
    if (isWalletConnected) {
      const result = await switchNetwork(toNetworkId);
      if (!result) return;
    }
  };

  return (
    <Flex
      mt={5}
      flexDir={['column', 'row']}
      alignItems={['center', 'flex-end']}
      justifyContent="space-between"
      gap={3}
    >
      <Menu>
        {({ isOpen }) => (
          <Flex width={['100%', 'auto']} flexDir="column" gap={2}>
            <Text fontSize="14px" fontWeight={700} lineHeight="20px">
              <Trans i18nKey="bridge.from" />
            </Text>
            <MenuButton
              as={Button}
              width="100%"
              variant="outline"
              colorScheme="gray"
              sx={{
                '> span': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                },
              }}
              p={2}
            >
              {icon}
              <Text variant="nav" fontSize="sm" fontWeight={700}>
                {name}
              </Text>
              {isOpen ? <ChevronUp color="white" /> : <ChevronDown color="white" />}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => switchMenuNetwork(ethNetworkId)}>
                {ethIcon}
                <Text variant="nav" ml={2}>
                  {ethName}
                </Text>
              </MenuItem>
              <MenuItem onClick={() => switchMenuNetwork(opNetworkId)}>
                {opIcon}
                <Text variant="nav" ml={2}>
                  {opName}
                </Text>
              </MenuItem>
            </MenuList>
          </Flex>
        )}
      </Menu>
      <IconButton
        onClick={() => {
          switchMenuNetwork(isL2 ? ethNetworkId : opNetworkId);
        }}
      >
        <ArrowsSwap width="36" />
      </IconButton>
      <Menu>
        {({ isOpen }) => {
          const toNetwork = activeIcon(isL2 ? ethNetworkId : opNetworkId);
          return (
            <Flex width={['100%', 'auto']} flexDir="column" gap={2}>
              <Text fontSize="14px" fontWeight={700} lineHeight="20px">
                <Trans i18nKey="bridge.to" />
              </Text>
              <MenuButton
                as={Button}
                variant="outline"
                colorScheme="gray"
                sx={{
                  '> span': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                  },
                }}
                p={2}
              >
                {toNetwork.icon}
                <Text variant="nav" fontSize="sm" fontWeight={700}>
                  {toNetwork.name}
                </Text>
                {isOpen ? <ChevronUp color="white" /> : <ChevronDown color="white" />}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => switchMenuNetwork(opNetworkId)}>
                  {ethIcon}
                  <Text variant="nav" ml={2}>
                    {ethName}
                  </Text>
                </MenuItem>
                <MenuItem onClick={() => switchMenuNetwork(ethNetworkId)}>
                  {opIcon}
                  <Text variant="nav" ml={2}>
                    {opName}
                  </Text>
                </MenuItem>
              </MenuList>
            </Flex>
          );
        }}
      </Menu>
    </Flex>
  );
}

export default SelectNetwork;
