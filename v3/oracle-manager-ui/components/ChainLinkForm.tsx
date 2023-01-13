import { Input, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ORACLE_NODE_TYPES } from '../utils/constants';

export const ChainLinkForm: FC<{
  address: string;
  twap: number;
  getValuesFromForm: (address: string, twap: number) => void;
}> = ({ address, twap, getValuesFromForm }) => {
  const { register, getValues, watch } = useForm({ defaultValues: { address, twap } });
  useEffect(() => {
    // eslint-disable-next-line
    getValuesFromForm(getValues('address'), getValues('twap'));
    // eslint-disable-next-line
  }, [watch()]);

  return (
    <>
      <Text>{ORACLE_NODE_TYPES[0].parameters[0].name}</Text>
      <Input
        {...register('address')}
        placeholder={ORACLE_NODE_TYPES[0].parameters[0].name}
        type="text"
      />
      <Text>{ORACLE_NODE_TYPES[0].parameters[1].name}</Text>
      <Input
        {...register('twap', { valueAsNumber: true })}
        placeholder={ORACLE_NODE_TYPES[0].parameters[1].name}
        type="number"
      />
    </>
  );
};
