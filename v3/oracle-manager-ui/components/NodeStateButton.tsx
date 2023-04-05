import { Button, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { providers, utils } from 'ethers';
import { FC, useCallback, useEffect, useState } from 'react';
import { encodeBytesByNodeType, getNodeModuleContract, hashId } from '../utils/contracts';
import { Node } from '../utils/types';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { shortAddress } from '../utils/addresses';
import { onboard, useIsConnected, useNetwork, useSigner } from '@snx-v3/useBlockchain';

let interval: any;

export const NodeStateButton: FC<{ node: Node }> = ({ node }) => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [isLoading, setIsLoading] = useState(false);
  const [nodeState, setNodeState] = useState<'registerNode' | 'nodeRegistered'>('registerNode');
  const [nodeId, setNodeId] = useState('');
  const [price, setPrice] = useState('0');
  const [time, setTime] = useState(new Date());
  const signer = useSigner();
  const isWalletConnected = useIsConnected();
  const network = useNetwork();
  const toast = useToast();
  const findParentNode = useCallback(
    (parentId: string) => {
      const parentNode = nodes.find((node) => node.id === parentId);
      if (parentNode) {
        return hashId(parentNode, []);
      }
      return '';
    },
    [nodes]
  );

  useEffect(() => {
    if (isWalletConnected && signer) {
      const fetchNodeState = async () => {
        if (network?.id) {
          try {
            const contract = getNodeModuleContract(signer, network.id);
            const hashedId = hashId(node, node.parents.map(findParentNode));
            const nodeFromChain = await contract.getNode(hashedId);
            if (nodeFromChain[0] > 0) {
              const nodeID = await contract.getNodeId(
                nodeFromChain[0],
                nodeFromChain[1],
                nodeFromChain[2]
              );
              setNodeId(nodeID);
              setNodeState('nodeRegistered');
              setNodes((state) => {
                return state.map((n) => {
                  if (n.id === nodeID) {
                    return { ...n, isRegistered: true };
                  }
                  return n;
                });
              });
              const price = await contract.process(nodeID);
              setPrice(utils.formatEther(price[0]));
              setTime(() => {
                const newDate = new Date(1970, 0, 1);
                newDate.setSeconds(price[1].toNumber());
                return newDate;
              });
              interval = setInterval(async () => {
                try {
                  const price = await contract.process(nodeID);
                  setTime(() => {
                    const newDate = new Date(1970, 0, 1);
                    newDate.setSeconds(price[1].toNumber());
                    return newDate;
                  });
                  setPrice(utils.formatEther(price[0]));
                } catch (error) {
                  console.error('interval for price fetching errored ', error);
                }
              }, 10000);
            } else {
              setNodeState('registerNode');
              setPrice('');
              setTime(new Date());
              setNodeId('');
              clearInterval(interval);
              setNodes((state) => {
                return state.map((n) => {
                  if (n.id === node.id) {
                    return { ...n, isRegistered: false };
                  }
                  return n;
                });
              });
            }
          } catch (error) {
            console.error(error);
            setNodeState('registerNode');
            setPrice('');
            setTime(new Date());
            setNodeId('');
            clearInterval(interval);
            setNodes((state) => {
              return state.map((n) => {
                if (n.id === node.id) {
                  return { ...n, isRegistered: false };
                }
                return n;
              });
            });
          }
        }
      };
      fetchNodeState();
    }
    // eslint-disable-next-line
  }, [isWalletConnected, network?.id, node.type, node.parameters, node.parents]);

  const handleButtonClick = async () => {
    if (!isWalletConnected) {
      onboard.connectWallet();
    } else if (nodeState === 'registerNode') {
      try {
        setIsLoading(true);
        const chainId = await signer?.getChainId();
        if (chainId && signer) {
          const contract = getNodeModuleContract(signer, chainId);
          const tx: providers.TransactionResponse = await contract.registerNode(
            node.typeId,
            encodeBytesByNodeType(node.typeId, node.parameters),
            node.parents.map(findParentNode)
          );
          await tx.wait(1);
          const nodeID = await contract.getNodeId(
            node.typeId,
            encodeBytesByNodeType(node.typeId, node.parameters),
            node.parents.map(findParentNode)
          );
          if (nodeID) {
            setNodeId(nodeID);
            setNodeState('nodeRegistered');
          }
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  const renderText = useCallback(() => {
    if (!isWalletConnected) return <Text>Please connect your wallet</Text>;
    if (nodeState === 'registerNode') return <Text>Register Node</Text>;
    if (nodeState === 'nodeRegistered') return '';
    return 'Something went wrong';
  }, [nodeState, isWalletConnected]);

  return (
    <Flex flexDir="column" alignItems="center">
      {isLoading ? (
        <Spinner colorScheme="cyan" />
      ) : nodeState !== 'nodeRegistered' ? (
        <Button
          border="1px solid white"
          size="xs"
          variant="outline"
          colorScheme="gray"
          onClick={(e) => {
            e.stopPropagation();
            handleButtonClick();
          }}
        >
          {renderText()}
        </Button>
      ) : price !== '0' && !!price ? (
        <Flex gap="2" flexDir="column">
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
            Price:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {price}
          </Text>
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
            Timestamp:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {time.toLocaleTimeString()} - {time.toLocaleDateString()}
          </Text>
        </Flex>
      ) : (
        'Something went wrong'
      )}
      <Text
        fontSize="xx-small"
        mt="2"
        _hover={{ opacity: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(nodeId);
          toast({
            description: 'Copy ID to clipboard',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }}
      >
        {!!nodeId && <Text>Node ID: {shortAddress(nodeId)}</Text>}
      </Text>
    </Flex>
  );
};
