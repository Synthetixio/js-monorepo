import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useNetwork, useSigner } from 'wagmi';
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
  const { data: signer } = useSigner();
  const { chain } = useNetwork();

  const fetchNode = async (id: string) => {
    if (signer && chain?.id) {
      const contract = getNodeModuleContract(signer, chain.id);
      const node = await contract.getNode(id);
      const nodeParams = decodeBytesByNodeType(node.nodeType, node.parameters);
      setNodes((state) => {
        const exists = state.find((state) => state.id === id);
        if (!exists) {
          x -= 200;
          y -= 200;
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
  }, [nodeID, signer]);

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
