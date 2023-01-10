import { Button, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { getNodeModuleContract, hashId } from '../utils/contracts';
import { Node } from '../utils/types';

export const NodeStateButton: FC<{ node: Node }> = ({ node }) => {
  const [nodeState, setNodeState] = useState();
  const signer = useSigner();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && signer.data) {
      signer.data?.getChainId().then((id) => {
        if (id) {
          const contract = getNodeModuleContract(signer.data, id);
          const hashedId = hashId(node.typeId, node.parameters, node.parents);
        }
      });
    }
  }, [
    isConnected,
    signer.isSuccess,
    node.typeId,
    node.parameters.toString(),
    node.parents.toString(),
  ]);

  const renderText = () => {
    if (!isConnected) return <Text>Please connect your wallet</Text>;
    return 'Something went wrong';
  };

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {renderText()}
    </Button>
  );
};
