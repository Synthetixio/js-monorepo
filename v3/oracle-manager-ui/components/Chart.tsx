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
import { ORACLE_NODE_TYPES } from '../utils/constants';
import { Node } from '../utils/types';
import { oracleTypeFromTypeId } from '../utils/url';
import { ChainLinkNode } from './ChainLinkNode';
import { ExternalNode } from './ExternalNode';
import { NodeFormModule } from './NodeFormModule';
import { PriceDeviationCircuitBreakerNode } from './PriceDeviationCircuitBreakerNode';
import { PythNode } from './PythNode';
import { ReducerNode } from './ReducerNode';
import { StalenessFallbackReducerNode } from './StalenessFallbackReducerNode';
import { UniswapNode } from './UniswapNode';

const NODE_TYPES = {
  [ORACLE_NODE_TYPES[0].value]: ChainLinkNode,
  [ORACLE_NODE_TYPES[3].value]: PythNode,
  [ORACLE_NODE_TYPES[4].value]: ReducerNode,
  [ORACLE_NODE_TYPES[6].value]: UniswapNode,
  [ORACLE_NODE_TYPES[2].value]: PriceDeviationCircuitBreakerNode,
  [ORACLE_NODE_TYPES[1].value]: ExternalNode,
  [ORACLE_NODE_TYPES[5].value]: StalenessFallbackReducerNode,
};

export const Chart: FC<{ cannotRemoveEdges?: boolean }> = ({ cannotRemoveEdges }) => {
  const toast = useToast();
  const params = new URLSearchParams(window.location.search);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [nodeToUpdate, setNodeToUpdate] = useState<undefined | Node>(undefined);
  const [edges, setEdges] = useEdgesState([]);

  const onNodesChange = (changes: NodeChange[]) =>
    setNodes(applyNodeChanges(changes, nodes) as Node[]);

  const onEdgesChange = (changes: EdgeChange[]) => {
    if (!cannotRemoveEdges) {
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
    }
  };

  const onConnect = (params: Connection) => {
    setEdges((eds) => {
      let shouldAddEdge = false;
      setNodes((state) => {
        const targetNode = state.find((node) => node.id === params.target);
        const settings = ORACLE_NODE_TYPES.find((type) => type.nodeType === targetNode?.typeId);
        if (targetNode && settings) {
          if (targetNode.parents.length >= settings.numberOfParents) {
            toast({
              title: 'Node reached max parents',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
            return state;
          }
          shouldAddEdge = true;
          return state.map((s) => {
            if (s.id === targetNode.id) {
              return { ...s, parents: [...s.parents, params.source!] };
            }
            return s;
          });
        }
        toast({
          title: 'Could not find node?',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return state;
      });
      if (shouldAddEdge) {
        return addEdge(params, eds);
      }
      return eds;
    });
  };

  useEffect(() => {
    if (!!params.values().next().value) {
      const stateObject: Partial<{
        tid: string;
        id: string;
        loc: string;
        pam: string;
        par: string;
      }> = Object.fromEntries(params.entries());
      const typeIds: number[] = JSON.parse(stateObject?.tid || '[]');
      const ids: string[] = JSON.parse(stateObject?.id || '[]');
      const locations: { x: string; y: string }[] = JSON.parse(stateObject?.loc || '[]');
      const parameters: any[][] = JSON.parse(stateObject?.pam || '[]');
      const parents: string[][] = JSON.parse(stateObject?.par || '[]');

      setNodes(() => {
        const newState = typeIds.map((id, index) => ({
          id: ids[index],
          typeId: id,
          position: { x: Number(locations[index].x), y: Number(locations[index].y) },
          parameters: parameters[index],
          parents: parents[index],
          data: { label: '?' },
          source: '',
          target: '',
          type: oracleTypeFromTypeId(id),
        }));
        newState.forEach((node) => {
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
        return newState;
      });
    } else {
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
    }
    // eslint-disable-next-line
  }, [nodes]);
  return (
    <Box
      bg="whiteAlpha.50"
      borderStyle="solid"
      borderColor="gray.900"
      borderWidth="1px"
      borderRadius="3px"
      w="100%"
      h="800px"
      position="relative"
    >
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={{
          style: {
            strokeWidth: 2,
            stroke: '#B0B0C2',
            strokeDasharray: '5,5',
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#B0B0C2',
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
      {!nodes.length && (
        <Text position="absolute" top="50%" right="50%" transform="translate(50%, 50%)">
          Add your first Node to get started
        </Text>
      )}
    </Box>
  );
};
