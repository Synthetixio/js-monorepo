import { Checkbox, Input, Text, useToast } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { Node } from '../utils/types';

export const PriceDeviationCircuitBreakerForm: FC<{
  tolerance: number;
  node?: Node;
  getValuesFromForm: (tolerance: number, parents: string[]) => void;
}> = ({ tolerance, node, getValuesFromForm }) => {
  const { register, watch, getValues, setValue } = useForm({
    defaultValues: { tolerance, parents: node?.parents || [] },
  });
  const [nodes] = useRecoilState(nodesState);
  const toast = useToast();
  useEffect(() => {
    getValuesFromForm(getValues('tolerance'), getValues('parents'));
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
                if (state.length >= 3) {
                  toast({
                    title: 'Only three parents are allowed',
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
      <Input {...register('tolerance')} placeholder="Deviation Tolerance" type="number"></Input>
    </>
  );
};
