import { Input, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ORACLE_NODE_TYPES } from '../utils/constants';

export const PriceDeviationCircuitBreakerForm: FC<{
  tolerance: number;
  getValuesFromForm: (tolerance: number) => void;
}> = ({ tolerance, getValuesFromForm }) => {
  const { register, watch, getValues } = useForm({
    defaultValues: { tolerance },
  });
  useEffect(() => {
    // eslint-disable-next-line
    getValuesFromForm(getValues('tolerance'));
    // eslint-disable-next-line
  }, [watch()]);
  return (
    <>
      <Text>{ORACLE_NODE_TYPES[2].parameters[0].name}</Text>
      <Input
        {...register('tolerance', { valueAsNumber: true })}
        placeholder={ORACLE_NODE_TYPES[2].parameters[0].name}
        type="number"
      ></Input>
    </>
  );
};
