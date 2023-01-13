import { Input, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ORACLE_NODE_TYPES } from '../utils/constants';

export const ExternalNodeForm: FC<{
  address: string;
  getValuesFromForm: (address: string) => void;
}> = ({ address, getValuesFromForm }) => {
  const { register, watch, getValues } = useForm({
    defaultValues: { address },
  });

  useEffect(() => {
    // eslint-disable-next-line
    getValuesFromForm(getValues('address'));
    // eslint-disable-next-line
  }, [watch()]);
  return (
    <>
      <Text>{ORACLE_NODE_TYPES[1].parameters[0].name}</Text>
      <Input
        {...register('address')}
        placeholder={ORACLE_NODE_TYPES[1].parameters[0].name}
        type="text"
      />
    </>
  );
};
