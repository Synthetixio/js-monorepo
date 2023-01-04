import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { Node } from '../utils/types';
import { ChainLinkNode } from './ChainLinkNode';
import { NodeFormModule } from './NodeFormModule';
import { PythNode } from './PythNode';
import { ReducerNode } from './ReducerNode';

const NODE_TYPES = { chainLink: ChainLinkNode, pyth: PythNode, reducer: ReducerNode };

export const Chart: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initNodes, setInitNodes] = useRecoilState(nodesState);
  const [nodeToUpdate, setNodeToUpdate] = useState<undefined | Node>(undefined);
  const [nodes, setNodes] = useNodesState(initNodes);
  const [edges, setEdges] = useEdgesState([]);
  const onNodesChange = (changes: NodeChange[]) => {
    const appliedChanges = applyNodeChanges(changes, nodes);
    setNodes(appliedChanges);
    setInitNodes(appliedChanges as Node[]);
  };
  const onEdgesChange = (changes: EdgeChange[]) => {
    const appliedChanges = applyEdgeChanges(changes, edges);
    appliedChanges.forEach((updatedEdge) => {
      setEdges(edges.filter((edge) => edge.id !== updatedEdge.id));
      setInitNodes((state) => {
        const removeParent = state.findIndex((node) => node.id === updatedEdge.target);
        return state.map((node, index) => {
          if (index === removeParent) {
            return {
              ...node,
              parents: node.parents.filter((parent) => parent !== updatedEdge.source),
            };
          }
          return node;
        });
      });
    });
  };
  const onConnect = (params: Connection) =>
    setEdges((eds) => {
      const addedEdge = addEdge(params, eds);
      addedEdge.forEach((edge) => {
        setInitNodes((state) => {
          const updatedNodeIndex = state.findIndex((node) => node.id === edge.target);
          return state.map((node, index) => {
            if (index === updatedNodeIndex) {
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
      return addedEdge;
    });

  useEffect(() => setNodes(initNodes), [initNodes.toString()]);

  return (
    <Box w="100%" h="500px">
      <Text textAlign="center" fontWeight="bold">
        The bottom of the node is always the downstream output and the top is the receiving end
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
