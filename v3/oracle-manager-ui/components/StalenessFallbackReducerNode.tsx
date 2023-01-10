import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { NodeStateButton } from './NodeStateButton';

export const StalenessFallbackReducerNode: FC<{ data: { label: string }; id: string }> = ({
  data,
  id,
}) => {
  const [nodes] = useRecoilState(nodesState);
  const node = nodes.find((node) => node.id === id);
  return (
    <Box
      bg="darkgreen"
      borderRadius="5px"
      p="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text>Staleness Circuit Breaker</Text>
      {node && <NodeStateButton node={node} />}
      {data.label && <Text>Name: {data.label}</Text>}
      <Text>Staleness: {node?.parameters[0]}</Text>
      <Handle
        type="source"
        isValidConnection={() => true}
        position={Position.Bottom}
        style={{ background: 'darkgreen' }}
        isConnectable
      ></Handle>
      <Handle
        type="target"
        isValidConnection={() => true}
        position={Position.Top}
        style={{ background: 'darkgreen' }}
        isConnectable
      ></Handle>
    </Box>
  );
};
