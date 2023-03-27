import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { EthereumIcon, FailedIcon, OptimismIcon } from '@snx-v3/icons';
import {
  disconnect,
  onboard,
  useIsConnected,
  useWallet,
  useNetwork,
  Network,
} from '@snx-v3/useBlockchain';
import { NetworkId, NetworkIdByName } from '@synthetixio/contracts-interface';
import { FC } from 'react';
import { shortAddress } from '../utils/addresses';
import { GitHubIcon } from './GitHubIcon';
import { SynthetixIcon } from './SynthetixIcon';

const activeIcon = (currentNetwork: Network) => {
  switch (currentNetwork.id) {
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

export const Header: FC = () => {
  const isWalletConnected = useIsConnected();
  const currentNetwork = useNetwork();
  const wallet = useWallet();

  const { name, icon } = activeIcon(currentNetwork);
  const switchNetwork = async (id: NetworkId) => {
    return onboard?.setChain({ chainId: `0x${id.toString(16)}` });
  };
  return (
    <Flex as="header" p="2" flexDir="column" w="100%" gap="2">
      <Flex w="100%" justifyContent="space-between" alignItems="center" px="5">
        <SynthetixIcon />
        <Heading fontFamily="Lustra Text" marginRight="auto" marginLeft="4" size="lg">
          Oracle Manager
        </Heading>
        <Flex alignItems="center" gap="2">
          <GitHubIcon />
          {isWalletConnected && (
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
                    <>
                      <Text variant="nav" fontSize="sm" fontWeight={700} ml={1.5} mr={2}>
                        {name}
                      </Text>
                      {isOpen ? (
                        <ChevronUpIcon color="cyan" />
                      ) : (
                        <ChevronDownIcon color="cyan.500" />
                      )}
                    </>
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => switchNetwork(NetworkIdByName.mainnet)}>
                      <EthereumIcon />
                      <Text variant="nav" ml={2}>
                        Ethereum Mainnet
                      </Text>
                    </MenuItem>
                    <MenuItem onClick={() => switchNetwork(NetworkIdByName['goerli'])}>
                      <EthereumIcon />
                      <Text variant="nav" ml={2}>
                        Goerli
                      </Text>
                    </MenuItem>
                    <MenuItem onClick={() => switchNetwork(NetworkIdByName['mainnet-ovm'])}>
                      <OptimismIcon />
                      <Text variant="nav" ml={2}>
                        Optimism
                      </Text>
                    </MenuItem>
                    <MenuItem onClick={() => switchNetwork(NetworkIdByName['goerli-ovm'])}>
                      <OptimismIcon />
                      <Text variant="nav" ml={2}>
                        Optimism Goerli
                      </Text>
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          )}

          {isWalletConnected ? (
            <Button onClick={disconnect}>{shortAddress(wallet?.address || '')}</Button>
          ) : (
            <Button onClick={() => onboard.connectWallet()}>Connect</Button>
          )}
        </Flex>
      </Flex>
      <Divider borderColor="gray.900" />
    </Flex>
  );
};
