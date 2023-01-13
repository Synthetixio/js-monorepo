import { Select } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ORACLE_NODE_TYPES } from '../utils/constants';

export const ReducerForm: FC<{
  operation: number;
  getValuesFromForm: (operation: number) => void;
}> = ({ operation, getValuesFromForm }) => {
  const { register, watch, getValues } = useForm({
    defaultValues: { operation: operation || 0 },
  });
  useEffect(() => {
    // eslint-disable-next-line
    getValuesFromForm(getValues('operation'));
    // eslint-disable-next-line
  }, [watch('operation')]);
  return (
    <>
      <Select {...register('operation', { valueAsNumber: true })}>
        {ORACLE_NODE_TYPES[4].parameters[0].options!.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </>
  );
};
