import { Input } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const ChainLinkForm: FC<{
  address: string;
  twap: number;
  getValuesFromForm: (address: string, twap: number) => void;
}> = ({ address, twap, getValuesFromForm }) => {
  const { register, getValues, watch } = useForm({ defaultValues: { address, twap } });
  useEffect(() => {
    const twap = Number(getValues('twap'));
    getValuesFromForm(getValues('address'), twap);
  }, [watch()]);
  return (
    <>
      <Input {...register('address')} placeholder="Address"></Input>
      <Input {...register('twap')} placeholder="TWAP in seconds" type="number"></Input>
    </>
  );
};
