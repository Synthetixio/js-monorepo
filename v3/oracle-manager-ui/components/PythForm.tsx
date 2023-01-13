import { Checkbox, Input, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ORACLE_NODE_TYPES } from '../utils/constants';

export const PythForm: FC<{
  address: string;
  priceFeedId: string;
  useEma: boolean;
  getValuesFromForm: (address: string, priceFeedId: string, useEma: boolean) => void;
}> = ({ address, priceFeedId, useEma, getValuesFromForm }) => {
  const { register, watch, getValues } = useForm({
    defaultValues: { address, priceFeedId, useEma },
  });
  useEffect(() => {
    // eslint-disable-next-line
    getValuesFromForm(getValues('address'), getValues('priceFeedId'), getValues('useEma'));
    // eslint-disable-next-line
  }, [watch()]);
  return (
    <>
      <Text>{ORACLE_NODE_TYPES[3].parameters[0].name}</Text>
      <Input {...register('address')} placeholder={ORACLE_NODE_TYPES[3].parameters[0].name}></Input>
      <Text>{ORACLE_NODE_TYPES[3].parameters[1].name}</Text>
      <Input {...register('priceFeedId')} placeholder={ORACLE_NODE_TYPES[3].parameters[1].name} />
      <Checkbox {...register('useEma')}>{ORACLE_NODE_TYPES[3].parameters[2].name}</Checkbox>
    </>
  );
};
