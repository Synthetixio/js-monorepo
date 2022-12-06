import { Box, Button, RadioGroup } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { poolsData } from '../../../utils/constants';
import { poolsState } from '../../../utils/state';
import DepositrOption from './DepositorOption';

type PropsType = {
  onClose: () => void;
};

export default function EditPosition({ onClose }: PropsType) {
  const pools = useRecoilValue(poolsState);
  const { setValue } = useFormContext();
  const poolValue = useWatch({
    name: 'poolId',
  });

  const [selectedPool, setSelectedPool] = useState<string>();

  return (
    <>
      <Box>
        <DepositrOption checked={selectedPool === '0'} name="No Pool" value="0" key="0" />
        <RadioGroup
          onChange={(v) => {
            setSelectedPool(v);
          }}
          value={selectedPool || poolValue}
        >
          {pools.map((option) => {
            const { name } = poolsData[option];
            return (
              <DepositrOption
                checked={selectedPool ? selectedPool : poolValue}
                name={name}
                value={option}
                key={option}
              />
            );
          })}
        </RadioGroup>
      </Box>
      <Button
        w="100%"
        onClick={() => {
          selectedPool && setValue('poolId', selectedPool);
          onClose();
        }}
      >
        Update
      </Button>
    </>
  );
}
