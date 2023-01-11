import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { ORACLE_NODE_TYPES } from '../utils/constants';
import { NodeStateButton } from './NodeStateButton';

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
      <Text>Reducer </Text>
      {node && <NodeStateButton node={node} />}
      {data.label && <Text>Name: {data.label}</Text>}
      {node && (
        <Text>
          Operation:
          {
            ORACLE_NODE_TYPES[4].parameters[0].options?.find(
              (option) => option.value === node.parameters[0]
            )?.label
          }
        </Text>
      )}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: 'gray' }}
        isValidConnection={() => true}
        isConnectable
      ></Handle>
      <Handle type="source" position={Position.Bottom} style={{ background: 'gray' }}></Handle>
    </Box>
  );
};
