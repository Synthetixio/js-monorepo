import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';

export const ReducerNode: FC<{ data: { label: string }; id: string }> = ({ data, id }) => {
  const [nodes] = useRecoilState(nodesState);
  const node = nodes.find((node) => node.id === id);
  return (
    <Box
      bg="gray"
      borderRadius="5px"
      p="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text fontSize="xx-small">Only two inputs are possible</Text>
      <Text>Reducer Node</Text>
      {node && <Text>Operation: {node.parameters[0]}</Text>}
      {data.label && <Text>{data.label}</Text>}
      <Handle type="source" position={Position.Top} style={{ background: 'gray' }}></Handle>
      <Handle type="source" position={Position.Bottom} style={{ background: 'gray' }}></Handle>
    </Box>
  );
};
