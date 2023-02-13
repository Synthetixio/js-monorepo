import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import { providers, utils } from 'ethers';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAccount, useNetwork, useSigner } from 'wagmi';
import { encodeBytesByNodeType, getNodeModuleContract, hashId } from '../utils/contracts';
import { Node } from '../utils/types';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { shortAddress } from '../utils/addresses';

let interval: any;

export const NodeStateButton: FC<{ node: Node }> = ({ node }) => {
  const [nodes] = useRecoilState(nodesState);
  const [nodeState, setNodeState] = useState<'registerNode' | 'nodeRegistered'>('registerNode');
  const [nodeId, setNodeId] = useState('');
  const [price, setPrice] = useState('0');
  const [time, setTime] = useState(new Date());
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
          try {
            const contract = getNodeModuleContract(signer, chain.id);
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
            }
          } catch (error) {
            console.error(error);
            setNodeState('registerNode');
            setPrice('');
            setTime(new Date());
            setNodeId('');
            clearInterval(interval);
          }
        }
      };
      fetchNodeState();
    }
    // eslint-disable-next-line
  }, [isConnected, signer, chain?.id, node.typeId, node.parameters, node.parents]);

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
      {price !== '0' && !!price && (
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
      )}
      <Text
        fontSize="xx-small"
        mt="2"
        _hover={{ opacity: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(nodeId);
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
