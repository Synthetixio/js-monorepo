import { Button, Text } from '@chakra-ui/react';
import { Contract, utils } from 'ethers';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { encodeBytesByNodeType, getNodeModuleContract, hashId } from '../utils/contracts';
import { Node } from '../utils/types';

export const NodeStateButton: FC<{ node: Node }> = ({ node }) => {
  const [nodeState, setNodeState] = useState<'registerNode' | 'nodeRegistered'>('registerNode');
  const [contract, setContract] = useState<null | Contract>(null);
  const signer = useSigner();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && signer.data) {
      const fetchNodeState = async () => {
        const chainId = await signer.data?.getChainId();
        if (chainId) {
          const contract = getNodeModuleContract(signer.data, chainId);
          setContract(contract);

          const hashedId = hashId(node.typeId, node.parameters, node.parents);
          try {
            const nodeId = await contract.getNode(hashedId);
            if (nodeId) {
              setNodeState('nodeRegistered');
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
    isConnected,
    signer.isSuccess,
    node.typeId,
    node.parameters.toString(),
    node.parents.toString(),
  ]);

  const renderText = useCallback(() => {
    if (!isConnected) return <Text>Please connect your wallet</Text>;
    if (nodeState === 'registerNode') return <Text>Register Node</Text>;
    return 'Something went wrong';
  }, [nodeState]);

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        if (nodeState === 'registerNode' && contract) {
          contract
            .getNodeId(node.typeId, encodeBytesByNodeType(node.typeId, node.parameters), node)
            .then();
          // contract.registerNode(
          //   node.typeId,
          //   encodeBytesByNodeType(node.typeId, node.parameters),
          //   node.parents.map((parent) => utils.formatBytes32String(parent))
          // );
        }
      }}
    >
      {renderText()}
    </Button>
  );
};
