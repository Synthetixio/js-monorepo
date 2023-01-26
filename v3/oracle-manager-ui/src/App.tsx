import { useEffect, FC } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Chart } from '../components/Chart';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { convertStateToQueryParam } from '../utils/url';
import { NodeFormModule } from '../components/NodeFormModule';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const App: FC = () => {
  const [nodes] = useRecoilState(nodesState);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, getValues } = useForm({ defaultValues: { search: '' } });
  const navigate = useNavigate();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Box px="10" py="5">
      <Flex justifyContent="space-between" mb="5">
        <Box>
          <Heading fontWeight="light">Welcome to</Heading>
          <Heading>Synthetix Oracle Manager</Heading>
        </Box>
        <Flex flexDirection="column" gap="4">
          <Text fontSize="sm" color="whiteAlpha.600">
            Search for existing Nodes here:
          </Text>
          <Flex>
            <Input
              placeholder="Enter Node ID"
              bg="whiteAlpha.300"
              minW="340px"
              {...register('search')}
            />
            <Button
              variant="outline"
              onClick={() => {
                const nodeId = getValues('search').trim();
                if (nodeId.startsWith('0x')) navigate('node/' + nodeId);
                else
                  toast({
                    title: 'Invalid node id',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  });
              }}
            >
              Search
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Divider color="gray.900" mb="5" />
      <Flex justifyContent="space-between" mb="5">
        <Text fontSize="sm" color="whiteAlpha.600">
          The bottom of the node is always the downstream output and the top is the receiving end.
          <br />
          Click on the black connection lines to disconnect a parent node from a child node.
        </Text>
        <Flex justifyContent="center" gap="2">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: 'Saved to local storage',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
              localStorage.setItem('oracleManagerUI', JSON.stringify(nodes));
            }}
          >
            Save
          </Button>
          <Button
            disabled={!nodes.length}
            variant="outline"
            onClick={() => {
              toast({
                title: 'Generated link and put it on your clipboard',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
              convertStateToQueryParam(nodes);
            }}
          >
            Save & Share
          </Button>
          <Button onClick={onOpen}>Add Node</Button>
        </Flex>
      </Flex>
      <NodeFormModule isOpen={isOpen} onClose={onClose} />
      <Chart />
    </Box>
  );
};
