import { Box, Button, RadioGroup } from '@chakra-ui/react';
import { usePools } from '@snx-v3/usePools';
import { PoolItem } from './PoolItem';
import { useState, useEffect } from 'react';

export function PoolSelector({
  poolId,
  setPoolId,
}: {
  poolId: string;
  setPoolId: (poolId: string) => void;
}) {
  const { data: pools = [] } = usePools();
  const [value, setValue] = useState(poolId);
  useEffect(() => {
    setValue(poolId);
  }, [poolId]);
  return (
    <>
      <Box>
        <RadioGroup onChange={setValue} value={value}>
          <PoolItem name="No Pool" value="0" />
          {pools.map(({ id, name }) => (
            <PoolItem key={id} name={name} value={id} />
          ))}
        </RadioGroup>
      </Box>
      <Button w="100%" onClick={() => setPoolId(value)}>
        Update
      </Button>
    </>
  );
}
