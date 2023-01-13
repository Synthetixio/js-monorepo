import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { NodeStateButton } from './NodeStateButton';

export const ExternalNode: FC<{ data: { label: string }; id: string }> = ({ data, id }) => {
  const [nodes] = useRecoilState(nodesState);
  const node = nodes.find((node) => node.id === id);
  return (
    <Box
      bg="white"
      borderRadius="5px"
      p="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
      color="black"
    >
      <Text>External Node</Text>
      {node && <NodeStateButton node={node} />}
      {data.label && <Text>Name: {data.label}</Text>}
      <Text fontSize="xx-small">Node Address: {node?.parameters[0]}</Text>
      <Handle
        type="source"
        isValidConnection={() => true}
        position={Position.Bottom}
        style={{ background: 'white' }}
        isConnectable
      ></Handle>
      <Handle
        type="target"
        isValidConnection={() => true}
        position={Position.Top}
        style={{ background: 'white' }}
        isConnectable
      ></Handle>
    </Box>
  );
};
