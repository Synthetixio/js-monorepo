import { Box, Button, RadioGroup } from '@chakra-ui/react';
import { usePools } from '@snx-v3/usePools';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import DepositrOption from './DepositorOption';

type PropsType = {
  onClose: () => void;
};

export default function EditPosition({ onClose }: PropsType) {
  const { data: pools } = usePools();
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
          {pools?.map((pool) => {
            return (
              <DepositrOption
                checked={selectedPool ? selectedPool : poolValue}
                name={pool.name}
                value={pool.id}
                key={pool.id}
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
