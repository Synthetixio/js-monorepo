import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';

export const UniswapNode: FC<{ data: { label: string }; id: string }> = ({ data, id }) => {
  const [nodes] = useRecoilState(nodesState);
  const node = nodes.find((node) => node.id === id);
  return (
    <Box
      bg="#FF007A"
      borderRadius="5px"
      p="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text>Uniswap</Text>
      {data.label && <Text>{data.label}</Text>}
      <Text fontSize="xx-small">Token address: {node?.parameters[0]}</Text>
      <Text fontSize="xx-small">Stablecoin address: {node?.parameters[1]}</Text>
      <Text fontSize="xx-small">Pool: {node?.parameters[2]}</Text>
      <Text>Seconds ago: {node?.parameters[3]}</Text>
      <Handle
        type="source"
        isValidConnection={() => true}
        position={Position.Bottom}
        style={{ background: '#FF007A' }}
        isConnectable
      ></Handle>
    </Box>
  );
};
