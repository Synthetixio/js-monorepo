import { Divider, Flex } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC } from 'react';
import { GitHubIcon } from './GitHubIcon';
import { SynthetixIcon } from './SynthetixIcon';

export const Header: FC = () => {
  return (
    <Flex as="header" p="2" flexDir="column" w="100%" gap="2">
      <Flex w="100%" justifyContent="space-between" alignItems="center" px="5">
        <SynthetixIcon />
        <Flex alignItems="center" gap="2">
          <GitHubIcon />
          <ConnectButton />
        </Flex>
      </Flex>
      <Divider borderColor="gray.900" />
    </Flex>
  );
};
