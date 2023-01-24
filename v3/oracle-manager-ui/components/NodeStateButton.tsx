import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import { providers, utils } from 'ethers';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAccount, useNetwork, useSigner } from 'wagmi';
import { encodeBytesByNodeType, getNodeModuleContract, hashId } from '../utils/contracts';
import { Node } from '../utils/types';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { shortAddress } from '../utils/addresses';

export const NodeStateButton: FC<{ node: Node }> = ({ node }) => {
  const [nodes] = useRecoilState(nodesState);
  const [nodeState, setNodeState] = useState<'registerNode' | 'nodeRegistered'>('registerNode');
  const [nodeId, setNodeId] = useState('');
  const [price, setPrice] = useState('0');
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
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
    if (isConnected && signer) {
      const fetchNodeState = async () => {
        if (chain?.id) {
          const contract = getNodeModuleContract(signer, chain.id);
          const hashedId = hashId(node, node.parents.map(findParentNode));
          try {
            const node = await contract.getNode(hashedId);
            if (node[0] > 0) {
              const nodeID = await contract.getNodeId(node[0], node[1], node[2]);
              setNodeId(nodeID);
              setNodeState('nodeRegistered');
              const price = await contract.process(nodeId);
              setPrice(utils.formatEther(price[0]));
              setInterval(async () => {
                const price = await contract.process(nodeId);
                setPrice(utils.formatEther(price[0]));
              }, 10000);
            } else {
              setNodeState('registerNode');
            }
          } catch (error) {
            console.error('getNode errored', error);
            setNodeState('registerNode');
          }
        }
      };
      fetchNodeState();
    }
  }, [
    node,
    isConnected,
    signer,
    chain?.id,
    findParentNode,
    node.typeId,
    node.parameters,
    node.parents,
    nodeId,
  ]);

  const handleButtonClick = async () => {
    if (nodeState === 'registerNode') {
      const chainId = await signer?.getChainId();
      if (chainId) {
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
    }
  };

  const renderText = useCallback(() => {
    if (!isConnected) return <Text>Please connect your wallet</Text>;
    if (nodeState === 'registerNode') return <Text>Register Node</Text>;
    if (nodeState === 'nodeRegistered') return '';
    return 'Something went wrong';
  }, [nodeState, isConnected]);

  return (
    <Flex flexDir="column" alignItems="center">
      {nodeState !== 'nodeRegistered' && (
        <Button
          size="xs"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleButtonClick();
          }}
        >
          {renderText()}
        </Button>
      )}
      {price !== '0' && (
        <Flex gap="2">
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
            Price:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {price}
          </Text>
        </Flex>
      )}
      <Text
        fontSize="xx-small"
        mt="2"
        _hover={{ opacity: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
          toast({
            title: 'Copy ID to clipboard',
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
