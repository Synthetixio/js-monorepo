import { useEffect, FC } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Chart } from '../components/Chart';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { convertStateToQueryParam } from '../utils/url';
import { NodeFormModule } from '../components/NodeFormModule';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { onboard } from '@snx-v3/useBlockchain';
import {
  encodeBytesByNodeType,
  getMultiCallContract,
  getNodeModuleContract,
  hashId,
} from '../utils/contracts';
import { useIsConnected, useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { SearchIcon } from '@chakra-ui/icons';
import { providers } from 'ethers';

export const App: FC = () => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, getValues } = useForm({ defaultValues: { search: '' } });
  const navigate = useNavigate();
  const network = useNetwork();
  const signer = useSigner();
  const isWalletConnected = useIsConnected();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Box px="10" py="5">
      <Flex justifyContent="space-between" mb="5">
        <Box>
          <Heading fontWeight="light">Welcome to</Heading>
          <Heading>Synthetix Oracle Manager</Heading>
        </Box>
        <Flex flexDirection="column" gap="4">
          <Text fontSize="sm" color="whiteAlpha.600">
            Search for existing Nodes here:
          </Text>
          <Flex>
            <Input placeholder="Enter Node ID" minW="340px" {...register('search')} mr="16px" />
            {!isWalletConnected ? (
              <Button size="sm" onClick={() => onboard.connectWallet()}>
                <Text p="2">Connect Wallet</Text>
              </Button>
            ) : (
              <Button
                variant="outline"
                colorScheme="gray"
                p="2"
                w="200px"
                leftIcon={<SearchIcon />}
                onClick={() => {
                  const nodeId = getValues('search').trim();
                  if (nodeId.startsWith('0x')) navigate('node/' + nodeId);
                  else
                    toast({
                      title: 'Invalid node id',
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                    });
                }}
              >
                Search
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Divider color="gray.900" mb="5" />
      <Flex justifyContent="space-between" mb="5">
        <Text fontSize="sm" color="whiteAlpha.600">
          The bottom of the node is always the downstream output and the top is the receiving end.
          <br />
          Click on the black connection lines to disconnect a parent node from a child node.
        </Text>
        <Flex justifyContent="center">
          <Button
            variant="outline"
            colorScheme="gray"
            mr="16px"
            isDisabled={!isWalletConnected}
            onClick={() => {
              if (nodes.every((node) => node.isRegistered)) {
                toast({
                  title: 'All nodes are already registered',
                  status: 'info',
                  duration: 9000,
                  isClosable: true,
                });
              } else if (signer && network?.id) {
                const multicallContract = getMultiCallContract(signer, network.id);
                const oracleManagerContract = getNodeModuleContract(signer, network.id);
                const data = nodes
                  .slice()
                  .filter((node) => !node.isRegistered)
                  .sort((a, b) => {
                    if (a.parents.length > b.parents.length) return 1;
                    if (a.parents.length < b.parents.length) return -1;
                    return 0;
                  })
                  .map((node) => {
                    return [
                      oracleManagerContract.address,
                      oracleManagerContract.interface.encodeFunctionData('registerNode', [
                        node.typeId,
                        encodeBytesByNodeType(node.typeId, node.parameters),
                        node.parents.map((parentId: string) => {
                          const parentNode = nodes.find((node) => node.id === parentId);
                          if (parentNode) {
                            return hashId(parentNode, []);
                          }
                          return '';
                        }),
                      ]),
                    ];
                  });
                multicallContract.aggregate(data).then((tx: providers.TransactionResponse) =>
                  tx.wait(1).then(() => {
                    setNodes((state) => {
                      return state.map((n) => ({ ...n, isRegistered: true }));
                    });
                  })
                );
              }
            }}
          >
            Register All Nodes
          </Button>
          <Button
            mr="16px"
            variant="outline"
            colorScheme="gray"
            onClick={() => {
              toast({
                title: 'Saved to local storage',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
              localStorage.setItem('oracleManagerUI', JSON.stringify(nodes));
            }}
          >
            Save
          </Button>
          <Button
            mr="16px"
            disabled={!nodes.length}
            variant="outline"
            colorScheme="gray"
            onClick={() => {
              toast({
                title: 'Generated link copied to your clipboard”',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
              convertStateToQueryParam(nodes);
            }}
          >
            Save & Share
          </Button>
          <Button onClick={onOpen} variant="solid" colorScheme="cyan">
            Add Node
          </Button>
        </Flex>
      </Flex>
      <NodeFormModule isOpen={isOpen} onClose={onClose} />
      <Chart />
    </Box>
  );
};
