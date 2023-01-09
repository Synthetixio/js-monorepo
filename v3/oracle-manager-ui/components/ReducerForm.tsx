import { Checkbox, Select, Text, useToast } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { ORACLE_NODE_TYPES } from '../utils/constants';
import { Node } from '../utils/types';

export const ReducerForm: FC<{
  operation: string;
  node?: Node;
  getValuesFromForm: (operation: string, parents: string[]) => void;
}> = ({ operation, getValuesFromForm, node }) => {
  const [nodes] = useRecoilState(nodesState);
  const { register, watch, getValues, setValue } = useForm({
    defaultValues: { operation: operation || 'max', parents: node?.parents || [] },
  });
  const toast = useToast();
  useEffect(() => {
    getValuesFromForm(getValues('operation'), getValues('parents'));
  }, [watch()]);
  return (
    <>
      <Text>Parents</Text>
      {nodes.map((existingNode) => {
        if (!node) {
          return (
            <Checkbox
              key={existingNode.id}
              value={existingNode.id}
              isChecked={getValues('parents').includes(existingNode.id)}
              onChange={(e) => {
                const state = getValues('parents');
                if (state.length >= 2) {
                  toast({
                    title: 'Only two parents are allowed',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  });
                } else if (state.includes(e.target.value)) {
                  setValue(
                    'parents',
                    state.filter((parent) => parent !== e.target.value)
                  );
                } else {
                  setValue('parents', [...state, e.target.value]);
                }
              }}
            >
              {existingNode.data.label}
            </Checkbox>
          );
        }
      })}
      <Select {...register('operation')}>
        {ORACLE_NODE_TYPES.at(4)?.parameters[0]?.options?.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </Select>
    </>
  );
};
