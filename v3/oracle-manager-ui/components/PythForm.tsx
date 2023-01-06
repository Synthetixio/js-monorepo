import { Input } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const PythForm: FC<{
  address: string;
  priceFeedId: string;
  getValuesFromForm: (address: string, priceFeedId: string) => void;
}> = ({ address, priceFeedId, getValuesFromForm }) => {
  const { register, watch, getValues } = useForm({ defaultValues: { address, priceFeedId } });
  useEffect(() => {
    getValuesFromForm(getValues('address'), getValues('priceFeedId'));
  }, [watch()]);
  return (
    <>
      <Input {...register('address')} placeholder="Address"></Input>
      <Input {...register('priceFeedId')} placeholder="Price feed id"></Input>
    </>
  );
};
