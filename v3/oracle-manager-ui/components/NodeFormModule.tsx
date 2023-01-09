import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { FC, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { ORACLE_NODE_TYPES } from '../utils/constants';
import { Node } from '../utils/types';
import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ChainLinkForm } from './ChainLinkForm';
import { ReducerForm } from './ReducerForm';
import { PythForm } from './PythForm';
import { ExternalNodeForm } from './ExternalNodeForm';
import { StalenessFallbackReducerForm } from './StalenessFallbackReducerForm';
import { UniswapForm } from './UniswapForm';
import { PriceDeviationCircuitBreakerForm } from './PriceDeviationCircuitBreakerForm';

export const NodeFormModule: FC<{ isOpen: boolean; onClose: () => void; node?: Node }> = ({
  isOpen,
  onClose,
  node,
}) => {
  const { register, watch, getValues, setValue } = useForm({
    defaultValues: {
      oracleNodeType: node?.type,
      nodeParents: node?.parents || [],
      nodeParameters: node?.parameters || [],
      nodeLabel: node?.data.label || '',
    },
  });
  const [nodes, setNodes] = useRecoilState(nodesState);
  const toast = useToast();
  useEffect(() => {
    if (node?.type) {
      setValue('oracleNodeType', node?.type);
      setValue('nodeParents', node?.parents);
      setValue('nodeParameters', node?.parameters);
      setValue('nodeLabel', node?.data.label);
    }
  }, [node?.type]);
  const componentByOracleType = useMemo(() => {
    const type = getValues('oracleNodeType');
    if (type === 'chainLink')
      return (
        <ChainLinkForm
          address={node?.parameters[0]}
          twap={node?.parameters[1]}
          getValuesFromForm={(address, twap) => {
            setValue('nodeParameters', [address, twap]);
          }}
        />
      );
    if (type === 'reducer')
      return (
        <ReducerForm
          operation={node?.parameters[0]}
          node={node}
          getValuesFromForm={(operation, parents) => {
            setValue('nodeParameters', [operation]);
            setValue('nodeParents', parents);
          }}
        />
      );
    if (type === 'pyth')
      return (
        <PythForm
          address={node?.parameters[0]}
          priceFeedId={node?.parameters[1]}
          getValuesFromForm={(address, priceFeedId) => {
            setValue('nodeParameters', [address, priceFeedId]);
          }}
        />
      );
    if (type === 'externalNode')
      return (
        <ExternalNodeForm
          node={node}
          address={node?.parameters[0]}
          getValuesFromForm={(address, parents) => {
            setValue('nodeParameters', [address]);
            setValue('nodeParents', parents);
          }}
        />
      );
    if (type === 'stalenessFallbackReducer')
      return (
        <StalenessFallbackReducerForm
          node={node}
          staleness={node?.parameters[0]}
          getValuesFromForm={(staleness, parents) => {
            setValue('nodeParameters', [staleness]);
            setValue('nodeParents', parents);
          }}
        />
      );
    if (type === 'priceDeviationCircuitBreaker')
      return (
        <PriceDeviationCircuitBreakerForm
          node={node}
          tolerance={node?.parameters[0]}
          getValuesFromForm={(tolerance, parents) => {
            setValue('nodeParameters', [tolerance]);
            setValue('nodeParents', parents);
          }}
        />
      );
    if (type === 'uniswap')
      return (
        <UniswapForm
          node={node}
          tokenOne={node?.parameters[0]}
          tokenTwo={node?.parameters[1]}
          pool={node?.parameters[2]}
          secondsAgo={node?.parameters[3]}
          getValuesFromForm={(tokenOne, tokenTwo, pool, secondsAgo) => {
            setValue('nodeParameters', [tokenOne, tokenTwo, pool, secondsAgo]);
          }}
        />
      );
  }, [watch('oracleNodeType')]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setValue('nodeLabel', '');
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{node ? `Update Node ${node.id}` : 'New Node'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column">
            {!node && (
              <Select {...register('oracleNodeType')}>
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                {ORACLE_NODE_TYPES.map((type) => (
                  <option value={type.value} key={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            )}
            {componentByOracleType}
            <Input placeholder="Node name" {...register('nodeLabel')} />
          </Flex>
        </ModalBody>
        <ModalFooter>
          {node && (
            <Button
              variant="outline"
              mr="2"
              onClick={() => {
                setNodes((state) => {
                  const newState = state
                    .filter((s) => s.id !== node.id)
                    .map((s) => {
                      if (s.parents.includes(node.id)) {
                        return { ...s, parents: s.parents.filter((parent) => parent !== node.id) };
                      }
                      return s;
                    });
                  return newState;
                });
                onClose();
              }}
            >
              Delete Node
            </Button>
          )}
          <Button
            onClick={() => {
              if (node) {
                setNodes((state) =>
                  state
                    .filter((s) => s.id !== node.id)
                    .concat({
                      ...node,
                      type: getValues('oracleNodeType')!,
                      parents: getValues('nodeParents'),
                      parameters: getValues('nodeParameters'),
                      data: { label: getValues('nodeLabel') || '' },
                    })
                );
                onClose();
              } else if (!node) {
                setNodes([
                  ...nodes,
                  {
                    type: getValues('oracleNodeType')!,
                    parents: getValues('nodeParents'),
                    parameters: getValues('nodeParameters'),
                    data: { label: getValues('nodeLabel') || '' },
                    id: Math.random().toString(16).slice(2),
                    position: { x: 200, y: 100 },
                    source: '',
                    target: '',
                  },
                ]);
                onClose();
              } else {
                toast({
                  title: 'Node type or label not defined',
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
          >
            Save Node
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
