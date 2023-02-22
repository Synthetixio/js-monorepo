import { Button, Divider, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { useConnectorContext } from '../containers/Connector';
import { shortAddress } from '../utils/addresses';
import { GitHubIcon } from './GitHubIcon';
import { SynthetixIcon } from './SynthetixIcon';

export const Header: FC = () => {
  const { connectWallet, isWalletConnected, walletAddress, disconnectWallet } =
    useConnectorContext();
  return (
    <Flex as="header" p="2" flexDir="column" w="100%" gap="2">
      <Flex w="100%" justifyContent="space-between" alignItems="center" px="5">
        <SynthetixIcon />
        <Flex alignItems="center" gap="2">
          <GitHubIcon />
          {isWalletConnected ? (
            <Button onClick={disconnectWallet}>{shortAddress(walletAddress || '')}</Button>
          ) : (
            <Button onClick={connectWallet}>Connect</Button>
          )}
        </Flex>
      </Flex>
      <Divider borderColor="gray.900" />
    </Flex>
  );
};
