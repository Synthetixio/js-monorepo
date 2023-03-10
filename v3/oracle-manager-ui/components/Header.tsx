import { Button, Divider, Flex } from '@chakra-ui/react';
import { disconnect, onboard, useIsConnected, useWallet } from '@snx-v3/useBlockchain';
import { FC } from 'react';
import { shortAddress } from '../utils/addresses';
import { GitHubIcon } from './GitHubIcon';
import { SynthetixIcon } from './SynthetixIcon';

export const Header: FC = () => {
  const isWalletConnected = useIsConnected();
  const wallet = useWallet();

  return (
    <Flex as="header" p="2" flexDir="column" w="100%" gap="2">
      <Flex w="100%" justifyContent="space-between" alignItems="center" px="5">
        <SynthetixIcon />
        <Flex alignItems="center" gap="2">
          <GitHubIcon />
          {isWalletConnected ? (
            <Button onClick={disconnect}>{shortAddress(wallet?.address || '')}</Button>
          ) : (
            <Button onClick={() => onboard.connectWallet}>Connect</Button>
          )}
        </Flex>
      </Flex>
      <Divider borderColor="gray.900" />
    </Flex>
  );
};
