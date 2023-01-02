import { Box } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Connection,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 50, y: 0 }, data: { label: '1' }, type: 'input' },
  { id: '2', position: { x: 50, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export const Chart: FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Box w="100%" h="500px">
      <ReactFlow nodes={nodes} fitView>
        <Background />
      </ReactFlow>
    </Box>
  );
};
