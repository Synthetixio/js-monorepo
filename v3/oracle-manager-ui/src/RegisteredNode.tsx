import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import { useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Chart } from '../components/Chart';
import { nodesState } from '../state/nodes';
import {
  decodeBytesByNodeType,
  getNodeModuleContract,
  nodeInformationByNodeIds,
} from '../utils/contracts';
import { OracleNodeTypes } from '../utils/types';

let x = 0;
let y = 0;

export const RegisteredNode: FC = () => {
  const [, setNodes] = useRecoilState(nodesState);
  const param = useParams();
  const nodeID = param?.nodeId;
  const signer = useSigner();
  const network = useNetwork();
  const fetchNode = async (id: string) => {
    if (signer && network?.id) {
      const contract = getNodeModuleContract(signer, network.id);
      const node = await contract.getNode(id);
      const nodeParams = decodeBytesByNodeType(node.nodeType, node.parameters);
      setNodes((state) => {
        const exists = state.find((state) => state.id === id);
        if (!exists) {
          x -= 300;
          y -= 300;
          return [
            ...state,
            {
              data: { label: nodeInformationByNodeIds(node.nodeType).label },
              id: id,
              parameters: nodeParams as any[],
              parents: node.parents,
              source: '',
              target: '',
              type: nodeInformationByNodeIds(node.nodeType).slug as OracleNodeTypes,
              position: { x, y },
              typeId: node.nodeType,
              isRegistered: true,
            },
          ];
        }
        return state;
      });
      if (node.parents.length) {
        node.parents.map((id: string) => fetchNode(id));
      }
    }
  };

  useEffect(() => {
    setNodes([]);
    if (nodeID) {
      fetchNode(nodeID);
    }
    // eslint-disable-next-line
  }, [nodeID]);

  return (
    <Flex p="10" flexDir="column" gap="5">
      <Link href="/" color="cyan.500">
        <Flex alignItems="center" gap="2">
          <ArrowBackIcon />
          <Text fontSize="sm" fontWeight="bold">
            Back To Home
          </Text>
        </Flex>
      </Link>
      <Flex alignItems="center" gap="2">
        <Heading>Node ID:</Heading>
        <Text fontSize="md" fontWeight="bold">
          {nodeID}
        </Text>
      </Flex>
      <Chart cannotRemoveEdges />
    </Flex>
  );
};
