import { Input, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ORACLE_NODE_TYPES } from '../utils/constants';

export const ChainLinkForm: FC<{
  address: string;
  twap: number;
  decimals: number;
  getValuesFromForm: (address: string, twap: number, decimals: number) => void;
}> = ({ address, twap, decimals, getValuesFromForm }) => {
  const { register, getValues, watch } = useForm({ defaultValues: { address, twap, decimals } });
  useEffect(() => {
    // eslint-disable-next-line
    getValuesFromForm(getValues('address'), getValues('twap'), getValues('decimals'));
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
      <Text>{ORACLE_NODE_TYPES[0].parameters[2].name}</Text>
      <Input
        {...register('decimals', { valueAsNumber: true })}
        placeholder={ORACLE_NODE_TYPES[0].parameters[2].name}
        type="number"
      />
    </>
  );
};
