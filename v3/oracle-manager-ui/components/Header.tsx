import { Divider, Flex, Heading } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <Flex as="header" p="2" flexDir="column" w="100%" gap="2">
      <Flex w="100%" justifyContent="space-evenly">
        <Heading>SNX Oracle Manager</Heading>
        <ConnectButton />
      </Flex>
      <Divider borderColor="cyan.500" />
    </Flex>
  );
};
