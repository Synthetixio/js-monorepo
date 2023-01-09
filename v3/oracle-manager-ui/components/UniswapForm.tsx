import { Input } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Node } from '../utils/types';

export const UniswapForm: FC<{
  tokenOne: string;
  tokenTwo: string;
  pool: string;
  secondsAgo: number;
  node?: Node;
  getValuesFromForm: (tokenOne: string, tokenTwo: string, pool: string, secondsAgo: number) => void;
}> = ({ tokenOne, tokenTwo, pool, secondsAgo, getValuesFromForm, node }) => {
  const { register, watch, getValues } = useForm({
    defaultValues: { tokenOne, tokenTwo, pool, secondsAgo },
  });

  useEffect(() => {
    getValuesFromForm(
      getValues('tokenOne'),
      getValues('tokenTwo'),
      getValues('pool'),
      getValues('secondsAgo')
    );
  }, [watch()]);
  return (
    <>
      <Input {...register('tokenOne')} placeholder="Token one address"></Input>
      <Input {...register('tokenTwo')} placeholder="Token two address"></Input>
      <Input {...register('pool')} placeholder="Pool address"></Input>
      <Input {...register('secondsAgo')} placeholder="Seconds Ago" type="number"></Input>
    </>
  );
};
