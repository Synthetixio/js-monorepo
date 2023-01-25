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
  Text,
} from '@chakra-ui/react';
import { FC, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { ORACLE_NODE_TYPES } from '../utils/constants';
import { Node, OracleNodeTypes } from '../utils/types';
import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ChainLinkForm } from './ChainLinkForm';
import { ReducerForm } from './ReducerForm';
import { PythForm } from './PythForm';
import { ExternalNodeForm } from './ExternalNodeForm';
import { StalenessFallbackReducerForm } from './StalenessFallbackReducerForm';
import { UniswapForm } from './UniswapForm';
import { PriceDeviationCircuitBreakerForm } from './PriceDeviationCircuitBreakerForm';
import { hashId } from '../utils/contracts';

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
  }, [node?.type, setValue, node?.parents, node?.data.label, node?.parameters]);

  const type = watch('oracleNodeType');

  const componentByOracleType = useMemo(() => {
    if (type === 'chainLink')
      return (
        <ChainLinkForm
          address={node?.parameters[0]}
          twap={node?.parameters[1]}
          decimals={node?.parameters[2]}
          getValuesFromForm={(address, twap, decimals) => {
            setValue('nodeParameters', [address, twap, decimals]);
          }}
        />
      );
    if (type === 'reducer')
      return (
        <ReducerForm
          operation={node?.parameters[0]}
          getValuesFromForm={(operation) => {
            setValue('nodeParameters', [operation]);
          }}
        />
      );
    if (type === 'pyth')
      return (
        <PythForm
          address={node?.parameters[0]}
          priceFeedId={node?.parameters[1]}
          useEma={node?.parameters[2]}
          getValuesFromForm={(address, priceFeedId, useEma) => {
            setValue('nodeParameters', [address, priceFeedId, useEma]);
          }}
        />
      );
    if (type === 'externalNode')
      return (
        <ExternalNodeForm
          address={node?.parameters[0]}
          getValuesFromForm={(address) => {
            setValue('nodeParameters', [address]);
          }}
        />
      );
    if (type === 'stalenessCircuitBreaker')
      return (
        <StalenessFallbackReducerForm
          staleness={node?.parameters[0]}
          getValuesFromForm={(staleness) => {
            setValue('nodeParameters', [staleness]);
          }}
        />
      );
    if (type === 'priceDeviationCircuitBreaker')
      return (
        <PriceDeviationCircuitBreakerForm
          tolerance={node?.parameters[0]}
          getValuesFromForm={(tolerance) => {
            setValue('nodeParameters', [tolerance]);
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
  }, [type, node, setValue]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setValue('nodeLabel', '');
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent bg="gray.900">
        <ModalHeader textAlign="center">{node ? `Update Node ${node.id}` : 'New Node'}</ModalHeader>
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
            <Text>Node name</Text>
            <Input placeholder="Node name" {...register('nodeLabel')} />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="center" width="100%">
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
                          return {
                            ...s,
                            parents: s.parents.filter((parent) => parent !== node.id),
                          };
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
                        typeId: typeToTypeId(getValues('oracleNodeType')!),
                        type: getValues('oracleNodeType')!,
                        parents: getValues('nodeParents'),
                        parameters: getValues('nodeParameters'),
                        data: { label: getValues('nodeLabel') || '' },
                      })
                  );
                  onClose();
                } else if (!node) {
                  const newNode = {
                    type: getValues('oracleNodeType')!,
                    typeId: typeToTypeId(getValues('oracleNodeType')!),
                    parents: getValues('nodeParents'),
                    parameters: getValues('nodeParameters'),
                    data: { label: getValues('nodeLabel') || '' },
                    id: '',
                    position: { x: 200, y: 100 },
                    source: '',
                    target: '',
                  };
                  setNodes([
                    ...nodes,
                    {
                      ...newNode,
                      id: hashId(newNode, newNode.parents),
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
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

function typeToTypeId(type: OracleNodeTypes) {
  switch (type) {
    case 'chainLink':
      return ORACLE_NODE_TYPES[0].nodeType;
    case 'reducer':
      return ORACLE_NODE_TYPES[4].nodeType;
    case 'externalNode':
      return ORACLE_NODE_TYPES[1].nodeType;
    case 'pyth':
      return ORACLE_NODE_TYPES[3].nodeType;
    case 'uniswap':
      return ORACLE_NODE_TYPES[6].nodeType;
    case 'stalenessCircuitBreaker':
      return ORACLE_NODE_TYPES[5].nodeType;
    case 'priceDeviationCircuitBreaker':
      return ORACLE_NODE_TYPES[2].nodeType;
  }
}
