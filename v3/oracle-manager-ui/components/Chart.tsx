import { Box, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  useEdgesState,
  addEdge,
  Connection,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { Node } from '../utils/types';
import { ChainLinkNode } from './ChainLinkNode';
import { ExternalNode } from './ExternalNode';
import { NodeFormModule } from './NodeFormModule';
import { PriceDeviationCircuitBreakerNode } from './PriceDeviationCircuitBreakerNode';
import { PythNode } from './PythNode';
import { ReducerNode } from './ReducerNode';
import { StalenessFallbackReducerNode } from './StalenessFallbackReducerNode';
import { UniswapNode } from './UniswapNode';

const NODE_TYPES = {
  chainLink: ChainLinkNode,
  pyth: PythNode,
  reducer: ReducerNode,
  uniswap: UniswapNode,
  priceDeviationCircuitBreakerNode: PriceDeviationCircuitBreakerNode,
  externalNode: ExternalNode,
  stalenessFallbackReducer: StalenessFallbackReducerNode,
};

export const Chart: FC = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [nodeToUpdate, setNodeToUpdate] = useState<undefined | Node>(undefined);
  const [edges, setEdges] = useEdgesState([]);

  const onNodesChange = (changes: NodeChange[]) =>
    setNodes(applyNodeChanges(changes, nodes) as Node[]);

  const onEdgesChange = (changes: EdgeChange[]) => {
    if ('id' in changes[0]) {
      const ids = changes[0].id.split('-');
      const source = ids[1];
      const target = ids[2];
      setEdges(edges.filter((edge) => edge.source !== source));

      setNodes((state) => {
        return state.map((node) => {
          if (node.parents.includes(source)) {
            return { ...node, parents: node.parents.filter((parent) => parent !== source) };
          }
          if (node.parents.includes(target)) {
            return { ...node, parents: node.parents.filter((parent) => parent !== target) };
          }
          return node;
        });
      });
    }
  };

  const onConnect = (params: Connection) => {
    setEdges((eds) => {
      const addedEdge = addEdge(params, eds);
      let edgeNotToAdd: string[] = [];
      addedEdge.forEach((edge) => {
        setNodes((state) => {
          const targetNode = state.find((node) => node.id === edge.target);
          return state.map((node) => {
            if (targetNode?.id === node.id) {
              if (targetNode.type === 'reducer' && targetNode.parents.length >= 2) {
                toast({
                  title: 'Reducer node only can have two inputs',
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
                edgeNotToAdd.push(edge.id);
                return node;
              }
              return {
                ...node,
                parents: node.parents.includes(edge.source)
                  ? node.parents
                  : [...node.parents, edge.source],
              };
            }
            return node;
          });
        });
      });
      return addedEdge.filter((edge) => !edgeNotToAdd.includes(edge.id));
    });
  };

  useEffect(() => {
    nodes.forEach((node) => {
      if (node.parents.length) {
        node.parents.forEach((parent) => {
          if (!edges.find((edge) => edge.source === parent)) {
            setEdges((eds) => {
              return addEdge(
                { source: parent, target: node.id, sourceHandle: null, targetHandle: null },
                eds
              );
            });
          }
        });
      }
    });
  }, [nodes.toString()]);
  console.log(nodes);
  return (
    <Box w="100%" h="500px">
      <Text textAlign="center" fontWeight="bold">
        The bottom of the node is always the downstream output and the top is the receiving end
      </Text>
      <Text textAlign="center" fontWeight="bold">
        Click on the black connection lines to disconnect a parent node from a child node
      </Text>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={{
          style: { strokeWidth: 3, stroke: 'black' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'black',
          },
        }}
        onNodeClick={(_, node) => {
          setNodeToUpdate(node as Node);
          onOpen();
        }}
      >
        <Background />
      </ReactFlow>
      <NodeFormModule
        isOpen={isOpen}
        onClose={() => {
          setNodeToUpdate(undefined);
          onClose();
        }}
        node={nodeToUpdate}
      />
    </Box>
  );
};
