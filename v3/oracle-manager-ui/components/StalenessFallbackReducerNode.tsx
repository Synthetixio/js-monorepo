import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { NodeStateButton } from './NodeStateButton';

export const StalenessFallbackReducerNode: FC<{ data: { label: string }; id: string }> = ({
  data,
  id,
}) => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const node = nodes.find((node) => node.id === id);
  return (
    <Box
      bg="green.800"
      borderRadius="4px"
      p="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Flex gap="2" alignItems="center" mb="2" width="100%">
        <Text fontSize="lg" fontWeight="bold" mr="auto">
          Staleness Circuit <br />
          Breaker
        </Text>
        <IconButton
          icon={<CloseIcon />}
          onClick={(e) => {
            e.stopPropagation();
            setNodes((state) => state.filter((existingNode) => existingNode.id !== node?.id));
          }}
          aria-label="close"
          variant="ghost"
          size="xs"
        />
      </Flex>
      <Flex
        flexDirection="column"
        gap="4"
        bg="green.900"
        p="5"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="whiteAlpha.400"
        borderRadius="4px"
        mb="2"
      >
        {data.label && (
          <Flex gap="2">
            <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
              Name:
            </Text>
            <Text fontSize="xs" color="whiteAlpha.800">
              {data.label}
            </Text>
          </Flex>
        )}
        <Flex gap="2">
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
            Staleness:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {node?.parameters[0]} Seconds
          </Text>
        </Flex>
      </Flex>
      {node && <NodeStateButton node={node} />}
      <Handle
        type="target"
        isValidConnection={() => true}
        position={Position.Top}
        style={{ background: '#077250' }}
        isConnectable
      ></Handle>
      <Handle
        type="source"
        isValidConnection={() => true}
        position={Position.Bottom}
        style={{ background: '#077250' }}
        isConnectable
      ></Handle>
    </Box>
  );
};
