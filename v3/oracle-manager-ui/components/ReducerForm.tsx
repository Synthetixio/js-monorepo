import { Select } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ORACLE_NODE_TYPES } from '../utils/constants';

export const ReducerForm: FC<{
  operation: string;
  getValuesFromForm: (operation: string) => void;
}> = ({ operation, getValuesFromForm }) => {
  const { register, watch, getValues } = useForm({
    defaultValues: { operation: operation || 'max' },
  });
  useEffect(() => {
    getValuesFromForm(getValues('operation'));
  }, [watch()]);
  return (
    <>
      <Select {...register('operation')}>
        {ORACLE_NODE_TYPES[4].parameters[0].options!.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </Select>
    </>
  );
};
