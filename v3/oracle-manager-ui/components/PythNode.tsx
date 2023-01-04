import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Handle, Position } from 'reactflow';

export const PythNode: FC = () => {
  return (
    <Box bg="#E6DAFE" borderRadius="5px" p="3">
      <Text>Pyth</Text>
      <Handle type="source" position={Position.Bottom} style={{ background: '#E6DAFE' }}></Handle>
    </Box>
  );
};
