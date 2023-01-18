import { Button, Divider, Flex, Heading, useDisclosure, useToast } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { convertStateToQueryParam } from '../utils/url';
import { GitHubIcon } from './GitHubIcon';
import { NodeFormModule } from './NodeFormModule';

export const Header: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nodes] = useRecoilState(nodesState);
  const toast = useToast();
  return (
    <>
      <Flex as="header" p="2" flexDir="column" w="100%" gap="2">
        <Flex w="100%" justifyContent="space-evenly" alignItems="center">
          <Heading>SNX Oracle Manager</Heading>
          <Button
            variant="outline"
            onClick={() => localStorage.setItem('oracleManagerUI', JSON.stringify(nodes))}
          >
            Save
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: 'Saved link to clipboard',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
              convertStateToQueryParam(nodes);
            }}
          >
            Share State
          </Button>
          <Button onClick={onOpen}>Add Node</Button>
          <ConnectButton />
          <GitHubIcon />
        </Flex>
        <Divider borderColor="cyan.500" />
      </Flex>
      <NodeFormModule isOpen={isOpen} onClose={onClose} />
    </>
  );
};
