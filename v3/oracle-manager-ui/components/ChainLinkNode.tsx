import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Handle, Position } from 'reactflow';

export const ChainLinkNode: FC = () => {
  return (
    <Box bg="#375bd2" borderRadius="5px" p="3">
      <Text>Chain Link</Text>
      <Handle type="source" position={Position.Bottom} style={{ background: '#375bd2' }}></Handle>
    </Box>
  );
};
