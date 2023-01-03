import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { Node } from '../utils/types';

export const NodeFormModule: FC<{ isOpen: boolean; onClose: () => void; node?: Node }> = ({
  isOpen,
  onClose,
  node,
}) => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [oracleNodeType, setOracleNodeType] = useState(node?.oracleNodeType || '');
  const [nodeParents, setNodeParents] = useState(node?.parents || []);
  const [nodeParameters, setNodeParameters] = useState(node?.parameters || '');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{node ? `Update Node ${node.id}` : 'New Node'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column">
            <Select onChange={(e) => setOracleNodeType(e.target.value)}>
              <option>Chain Link</option>
            </Select>
            <CheckboxGroup onChange={(event) => setNodeParents(event.map((e) => String(e)))}>
              <Checkbox>parent 1</Checkbox>
            </CheckboxGroup>
            some more params? @TODO
          </Flex>
        </ModalBody>
        <ModalFooter>
          {node && (
            <Button
              variant="outline"
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
            variant="ghost"
            onClick={() => {
              if (node) {
                setNodes((state) =>
                  state
                    .filter((s) => s.id !== node.id)
                    .concat({
                      ...node,
                      oracleNodeType,
                      parents: nodeParents,
                      parameters: nodeParameters,
                    })
                );
              } else {
                setNodes([
                  ...nodes,
                  {
                    oracleNodeType,
                    parents: nodeParents,
                    parameters: nodeParameters,
                    nodeType: 'default',
                    data: {
                      label: new Date()
                        .getMinutes()
                        .toString()
                        .concat(new Date().getSeconds().toString()),
                    },
                    id: new Date()
                      .getMinutes()
                      .toString()
                      .concat(new Date().getSeconds().toString()),
                    position: { x: 200, y: 100 },
                  },
                ]);
              }
              onClose();
            }}
          >
            Save Node
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
