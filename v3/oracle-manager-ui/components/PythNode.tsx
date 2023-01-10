import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { NodeStateButton } from './NodeStateButton';

export const PythNode: FC<{ data: { label: string }; id: string }> = ({ data, id }) => {
  const [nodes] = useRecoilState(nodesState);
  const node = nodes.find((node) => node.id === id);
  return (
    <Box
      bg="#E6DAFE"
      color="black"
      borderRadius="5px"
      p="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text>Pyth</Text>
      {node && <NodeStateButton node={node} />}
      {data.label && <Text>Name: {data.label}</Text>}
      <Text fontSize="xx-small">Address: {node?.parameters[0]}</Text>
      <Text>Price feed: {node?.parameters[1]}</Text>
      <Text>Use EMA: {node?.parameters[2].toString()}</Text>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#E6DAFE' }}
        isValidConnection={() => true}
        isConnectable
      ></Handle>
    </Box>
  );
};
