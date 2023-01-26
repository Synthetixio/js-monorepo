import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { shortAddress } from '../utils/addresses';
import { NodeStateButton } from './NodeStateButton';

export const PythNode: FC<{ data: { label: string }; id: string }> = ({ data, id }) => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const params = useParams();
  const node = nodes.find((node) => node.id === id);
  return (
    <Box
      bg="teal.800"
      borderRadius="4px"
      p="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Flex gap="2" alignItems="center" mb="2" width="100%">
        <svg
          width="22"
          height="32"
          viewBox="0 0 22 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.26958 32C2.99347 32 2.83363 31.782 2.83363 31.5641V9.88288C2.7755 8.95285 2.89175 5.59605 5.49291 2.87863C6.30668 2.00674 8.58815 0.0595001 12.0757 0.00137363C15.4471 -0.0567529 17.7867 1.74517 18.6004 2.50081C19.4723 3.31458 21.4777 5.53792 21.594 9.08364C21.6957 12.6729 19.6903 15.0125 18.8765 15.8699C16.4788 18.3112 13.558 18.5873 12.41 18.6454C12.192 18.6454 11.974 18.4275 11.974 18.2095C11.974 17.9334 12.1339 17.7735 12.41 17.7735C13.4417 17.7735 16.101 17.4539 18.2807 15.2741C18.8765 14.6783 20.8383 12.455 20.7802 9.12723C20.7221 5.87215 18.7167 3.75053 18.0628 3.19833C17.467 2.66066 15.4035 0.974992 12.3082 0.974992C12.2501 0.974992 12.2065 0.974992 12.1484 0.974992C8.99503 1.03312 6.93154 2.82051 6.1759 3.59068C3.77818 5.9884 3.73459 9.02551 3.73459 9.89741V31.5786C3.70552 31.8256 3.53114 32 3.26958 32Z"
            fill="white"
          />
          <path
            d="M12.1194 12.5421C10.3756 12.5421 8.96606 11.1325 8.96606 9.38871C8.96606 7.64492 10.3756 6.23535 12.1194 6.23535C13.8632 6.23535 15.2728 7.64492 15.2728 9.38871C15.2728 11.1325 13.8632 12.5421 12.1194 12.5421ZM12.1194 7.04912C10.8697 7.04912 9.83796 8.08087 9.83796 9.33059C9.83796 10.5803 10.8697 11.6121 12.1194 11.6121C13.3691 11.6121 14.4009 10.5803 14.4009 9.33059C14.4009 8.08087 13.3691 7.04912 12.1194 7.04912Z"
            fill="white"
          />
          <path
            d="M6.20499 24.3854C5.92889 24.3854 5.76904 24.1674 5.76904 23.9495V9.86832C5.76904 9.59222 5.98702 9.43237 6.20499 9.43237C6.42297 9.43237 6.64094 9.65035 6.64094 9.86832V23.9495C6.62641 24.1674 6.42297 24.3854 6.20499 24.3854Z"
            fill="white"
          />
          <path
            d="M9.34391 28.7884C9.06781 28.7884 8.90796 28.5705 8.90796 28.3525V20.8542C8.90796 20.5781 9.12593 20.4182 9.34391 20.4182C9.56188 20.4182 9.77986 20.6362 9.77986 20.8542V28.3525C9.83798 28.5705 9.62001 28.7884 9.34391 28.7884Z"
            fill="white"
          />
          <path
            d="M0.435949 25.2574C0.159848 25.2574 0 25.0395 0 24.8215V15.2597C0 14.9836 0.217974 14.8237 0.435949 14.8237C0.653923 14.8237 0.871897 15.0417 0.871897 15.2597V24.8215C0.871897 25.0976 0.712049 25.2574 0.435949 25.2574Z"
            fill="white"
          />
          <path
            d="M12.1192 15.6955C8.58806 15.6955 5.75439 12.8183 5.75439 9.33067C5.75439 5.85761 8.57353 2.96582 12.1192 2.96582C15.665 2.96582 18.4841 5.84308 18.4841 9.33067C18.4841 12.8183 15.6068 15.6955 12.1192 15.6955ZM12.1192 3.85225C9.08214 3.85225 6.62629 6.29356 6.62629 9.3452C6.62629 12.3968 9.0676 14.8382 12.1192 14.8382C15.1709 14.8382 17.6122 12.3968 17.6122 9.3452C17.6122 6.29356 15.1128 3.85225 12.1192 3.85225Z"
            fill="white"
          />
        </svg>

        <Text fontSize="lg" fontWeight="bold" mr="auto">
          Pyth Node
        </Text>
        <IconButton
          disabled={!!params.nodeId}
          icon={<CloseIcon />}
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
        bg="teal.900"
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
            Token 1:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {shortAddress(node?.parameters[0])}
          </Text>
        </Flex>
        <Flex gap="2">
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
            Price Feed:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {shortAddress(node?.parameters[1])}
          </Text>
        </Flex>
        <Flex gap="2">
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
            Use EMA:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800" textTransform="capitalize">
            {node?.parameters[2].toString()}
          </Text>
        </Flex>
      </Flex>
      {node && <NodeStateButton node={node} />}
      <Handle
        type="source"
        isValidConnection={() => true}
        position={Position.Bottom}
        style={{ background: '#234E52' }}
        isConnectable
      ></Handle>
    </Box>
  );
};
