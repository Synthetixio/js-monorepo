import { Checkbox, Input, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { Node } from '../utils/types';

export const ExternalNodeForm: FC<{
  address: string;
  node?: Node;
  getValuesFromForm: (address: string, parents: string[]) => void;
}> = ({ address, node, getValuesFromForm }) => {
  const { register, watch, getValues, setValue } = useForm({
    defaultValues: { address, parents: node?.parents || [] },
  });
  const [nodes] = useRecoilState(nodesState);
  useEffect(() => {
    getValuesFromForm(getValues('address'), getValues('parents'));
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
                if (state.includes(e.target.value)) {
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
      <Input {...register('address')} placeholder="Address"></Input>
    </>
  );
};
