import { Button, Flex, Text } from '@chakra-ui/react';
import { Contract } from 'ethers';
import type { providers } from 'ethers';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { encodeBytesByNodeType, getNodeModuleContract, hashId } from '../utils/contracts';
import { Node } from '../utils/types';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';

export const NodeStateButton: FC<{ node: Node }> = ({ node }) => {
  const [nodes] = useRecoilState(nodesState);
  const [nodeState, setNodeState] = useState<'registerNode' | 'nodeRegistered'>('registerNode');
  const [contract, setContract] = useState<null | Contract>(null);
  const [nodeId, setNodeId] = useState('');
  const [price, setPrice] = useState('0');
  const signer = useSigner();
  const { isConnected } = useAccount();

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
    if (isConnected && signer.data) {
      const fetchNodeState = async () => {
        const chainId = await signer.data?.getChainId();
        if (chainId) {
          const contract = getNodeModuleContract(signer.data, chainId);
          setContract(contract);
          const hashedId = hashId(node, node.parents.map(findParentNode));
          try {
            const node = await contract.getNode(hashedId);
            if (node[0] > 0) {
              const nodeID = await contract.getNodeId(node[0], node[1], node[2]);
              setNodeId(nodeID);
              setNodeState('nodeRegistered');
            } else {
              setNodeState('registerNode');
            }
          } catch (error) {
            console.error(error);
            setNodeState('registerNode');
          }
        }
      };
      fetchNodeState();
    }
  }, [
    node,
    isConnected,
    signer.isSuccess,
    signer.data,
    findParentNode,
    node.typeId,
    node.parameters,
    node.parents,
  ]);

  const handleButtonClick = async () => {
    if (nodeState === 'registerNode' && contract) {
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
    if (nodeState === 'nodeRegistered' && contract) {
      const price = await contract.process(hashId(node, node.parents.map(findParentNode)));
      setPrice(price[0].toString());
    }
  };

  const renderText = useCallback(() => {
    if (!isConnected) return <Text>Please connect your wallet</Text>;
    if (nodeState === 'registerNode') return <Text>Register Node</Text>;
    if (nodeState === 'nodeRegistered') return <Text>Click for price update</Text>;
    return 'Something went wrong';
  }, [nodeState, isConnected]);

  return (
    <Flex flexDir="column" alignItems="center">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleButtonClick();
        }}
      >
        {renderText()}
      </Button>
      <Text>{price !== '0' && price}</Text>
      <Text fontSize="xx-small">{!!nodeId && <Text>Node ID: {nodeId}</Text>}</Text>
    </Flex>
  );
};
