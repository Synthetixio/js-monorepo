import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';

export const ChainLinkNode: FC<{ data: { label: string }; id: string }> = ({ data, id }) => {
  const [nodes] = useRecoilState(nodesState);
  const node = nodes.find((node) => node.id === id);
  return (
    <Box
      bg="#375bd2"
      borderRadius="5px"
      p="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text>Chain Link</Text>
      {data.label && <Text>{data.label}</Text>}
      <Text fontSize="xx-small">Address: {node?.parameters[0]}</Text>
      <Text>TWAP: {node?.parameters[1]}</Text>
      <Text>Decimal: {node?.parameters[2]}</Text>
      <Handle
        type="source"
        isValidConnection={() => true}
        position={Position.Bottom}
        style={{ background: '#375bd2' }}
        isConnectable
      ></Handle>
    </Box>
  );
};
