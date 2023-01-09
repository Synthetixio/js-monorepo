import { Checkbox, Input, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { ORACLE_NODE_TYPES } from '../utils/constants';
import { Node } from '../utils/types';

export const StalenessFallbackReducerForm: FC<{
  staleness: number;
  node?: Node;
  getValuesFromForm: (staleness: number, parents: string[]) => void;
}> = ({ staleness, getValuesFromForm, node }) => {
  const [nodes] = useRecoilState(nodesState);
  const { register, watch, getValues, setValue } = useForm({
    defaultValues: { staleness, parents: node?.parents || [] },
  });

  useEffect(() => {
    getValuesFromForm(getValues('staleness'), getValues('parents'));
  }, [watch()]);

  return (
    <>
      {!node && <Text>Parents</Text>}
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
      <Input placeholder={ORACLE_NODE_TYPES.at(5)?.parameters[0].name} {...register('staleness')} />
    </>
  );
};
