import { Input, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { ORACLE_NODE_TYPES } from '../utils/constants';

export const StalenessFallbackReducerForm: FC<{
  staleness: number;
  getValuesFromForm: (staleness: number) => void;
}> = ({ staleness, getValuesFromForm }) => {
  const [nodes] = useRecoilState(nodesState);
  const { register, watch, getValues } = useForm({
    defaultValues: { staleness },
  });

  useEffect(() => {
    getValuesFromForm(getValues('staleness'));
  }, [watch()]);

  return (
    <>
      <Text>{ORACLE_NODE_TYPES[5].parameters[0].name}</Text>
      <Input
        placeholder={ORACLE_NODE_TYPES[5].parameters[0].name}
        {...register('staleness', { valueAsNumber: true })}
        type="number"
      />
    </>
  );
};
