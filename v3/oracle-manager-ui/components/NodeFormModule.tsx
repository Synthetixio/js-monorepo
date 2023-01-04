import {
  Button,
  Checkbox,
  CheckboxGroup,
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
import { FC, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { ORACLE_NODE_TYPES } from '../utils/constants';
import { Node, OracleNodeTypes } from '../utils/types';
import { useToast } from '@chakra-ui/react';

export const NodeFormModule: FC<{ isOpen: boolean; onClose: () => void; node?: Node }> = ({
  isOpen,
  onClose,
  node,
}) => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [oracleNodeType, setOracleNodeType] = useState(node?.type || undefined);
  const [nodeLabel, setNodeLabel] = useState(node?.data.label);
  const [nodeParents, setNodeParents] = useState(node?.parents || []);
  const [nodeParameters, setNodeParameters] = useState(node?.parameters || []);
  const toast = useToast();

  useEffect(() => {
    if (node) {
      setOracleNodeType(node.type);
      setNodeLabel(node.data.label);
      setNodeParents(node.parents);
      setNodeParameters(node.parameters);
    }
  }, [node]);

  const resetInputs = () => {
    setOracleNodeType(undefined);
    setNodeLabel(undefined);
    setNodeParameters([]);
    setNodeParents([]);
  };

  const setChainLinkParameters = (value: string, index: number) => {};
  const setPythParameters = (value: string, index: number) => {};

  const customFormForOracleType = useMemo(() => {
    if (oracleNodeType === 'reducer') {
      return (
        <Flex flexDir="column" gap="2" py="2">
          <CheckboxGroup onChange={(event) => setNodeParents(event.map((e) => String(e)))}>
            <Flex flexWrap="wrap" gap="2">
              {nodes.map((exitingNode) => {
                if (exitingNode.id !== node?.id) {
                  return <Checkbox value={exitingNode.id}>{exitingNode.data.label}</Checkbox>;
                }
                return;
              })}
            </Flex>
          </CheckboxGroup>
          <Select
            placeholder="Select Operation"
            onChange={(e) => setNodeParameters([e.target.value])}
          >
            {ORACLE_NODE_TYPES.at(4)!.parameters[0].options?.map((operation) => (
              <option value={operation}>{operation}</option>
            ))}
          </Select>
        </Flex>
      );
    }
    if (oracleNodeType === 'chainLink' || !oracleNodeType) {
      return (
        <Flex flexDir="column" gap="2" py="2">
          {ORACLE_NODE_TYPES.at(0)?.parameters.map((parameter, index) => (
            <Input
              placeholder={parameter.name}
              onChange={(e) => setChainLinkParameters(e.target.value, index)}
            />
          ))}
        </Flex>
      );
    }
    if (oracleNodeType === 'pyth') {
      return (
        <Flex flexDir="column" gap="2" py="2">
          {ORACLE_NODE_TYPES.at(3)!.parameters.map((parameter, index) => (
            <Input
              placeholder={parameter.name}
              onChange={(e) => setPythParameters(e.target.value, index)}
            />
          ))}
        </Flex>
      );
    }
    return <>Implement me</>;
  }, [oracleNodeType]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetInputs();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{node ? `Update Node ${node.id}` : 'New Node'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column">
            <Select
              value={oracleNodeType}
              onChange={(e) => {
                if (e.target.value) {
                  setOracleNodeType(e.target.value as OracleNodeTypes);
                }
              }}
            >
              {ORACLE_NODE_TYPES.map((type) => (
                <option value={type.value}>{type.label}</option>
              ))}
            </Select>
            {customFormForOracleType}
            <Input
              value={nodeLabel}
              placeholder="Node Name"
              onChange={(e) => setNodeLabel(e.target.value)}
            />
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
                      type: oracleNodeType!,
                      parents: nodeParents,
                      parameters: nodeParameters,
                      data: { label: nodeLabel || '' },
                    })
                );
                resetInputs();
                onClose();
              } else if (oracleNodeType && nodeLabel) {
                setNodes([
                  ...nodes,
                  {
                    type: oracleNodeType,
                    parents: nodeParents,
                    parameters: nodeParameters,
                    data: {
                      label: nodeLabel,
                    },
                    id: new Date()
                      .getMinutes()
                      .toString()
                      .concat(new Date().getSeconds().toString()),
                    position: { x: 200, y: 100 },
                  },
                ]);
                resetInputs();
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
