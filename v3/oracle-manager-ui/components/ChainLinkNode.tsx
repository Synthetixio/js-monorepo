import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { shortAddress } from '../utils/addresses';
import { NodeStateButton } from './NodeStateButton';

export const ChainLinkNode: FC<{ data: { label: string }; id: string }> = ({ data, id }) => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const params = useParams();
  const node = nodes.find((node) => node.id === id);

  return (
    <Box
      bg="purple.800"
      borderRadius="4px"
      p="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="280px"
    >
      <Flex gap="2" alignItems="center" mb="2" w="100%">
        <svg
          width="28"
          height="32"
          viewBox="0 0 28 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8586 6.77129L21.86 11.3645V20.596L13.8811 25.2174L5.88538 20.6355V11.4096L13.8586 6.77129ZM13.8586 0L10.9244 1.69282L2.93423 6.33116L0 8.02398V24.0324L2.93423 25.7253L10.9356 30.3185L13.8699 32.0113L16.8041 30.3185L24.7773 25.6914L27.7115 23.9986V7.96755L24.7773 6.27473L16.7815 1.69282L13.8473 0H13.8586Z"
            fill="white"
          />
        </svg>
        <Text fontSize="lg" fontWeight="bold" mr="auto">
          Chain Link
        </Text>
        <IconButton
          disabled={!!params.nodeId}
          icon={<CloseIcon color="white" />}
          onClick={(e) => {
            e.stopPropagation();
            setNodes((state) => {
              const newState = state
                .filter((s) => s.id !== node?.id)
                .map((s) => {
                  if (s.parents.includes(node?.id || '')) {
                    return {
                      ...s,
                      parents: s.parents.filter((parent) => parent !== node?.id),
                    };
                  }
                  return s;
                });
              return newState;
            });
          }}
          aria-label="close"
          variant="ghost"
          size="xs"
        />
      </Flex>
      <Flex
        flexDirection="column"
        gap="4"
        bg="purple.900"
        p="5"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="whiteAlpha.400"
        borderRadius="4px"
        mb="2"
        w="100%"
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
            Address:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {shortAddress(node?.parameters[0])}
          </Text>
        </Flex>
        <Flex gap="2">
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
            TWAP:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {node?.parameters[1]} Seconds
          </Text>
        </Flex>
        <Flex gap="2">
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
            Decimals:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {node?.parameters[2]}
          </Text>
        </Flex>
      </Flex>
      {node && <NodeStateButton node={node} />}
      <Handle
        type="source"
        isValidConnection={() => true}
        position={Position.Bottom}
        style={{ background: '#1D1084' }}
        isConnectable
      ></Handle>
    </Box>
  );
};
