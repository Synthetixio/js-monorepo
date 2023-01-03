import { Button, Divider, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC, useState } from 'react';
import { NodeFormModule } from './NodeFormModule';

export const Header: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nodeType, setNodeType] = useState('');
  return (
    <>
      <Flex as="header" p="2" flexDir="column" w="100%" gap="2">
        <Flex w="100%" justifyContent="space-evenly">
          <Heading>SNX Oracle Manager</Heading>
          <Button onClick={onOpen}>Add Node</Button>
          <ConnectButton />
        </Flex>
        <Divider borderColor="cyan.500" />
      </Flex>
      <NodeFormModule isOpen={isOpen} onClose={onClose} />
    </>
  );
};
