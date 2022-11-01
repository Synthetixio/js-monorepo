import { Tooltip } from '@chakra-ui/react';
import Big from 'big.js';
import { BigNumberish } from 'ethers';
import { FC, useMemo } from 'react';
import { currency } from '../../../utils/currency';

interface Props {
  prefix?: string;
  value: BigNumberish;
  suffix?: string;
}

export const Amount: FC<Props> = ({ value, prefix = '', suffix = '' }) => {
  const parsedValue = currency(value.toString());

  const isDisabled = useMemo(() => {
    return Big(value.toString()).eq(parsedValue.split(',').join(''));
  }, [parsedValue, value]);

  return (
    <Tooltip
      label={
        <>
          {prefix}
          {value.toString()}
          {suffix}
        </>
      }
      isDisabled={isDisabled}
    >
      <span>
        {prefix}
        {parsedValue}
        {suffix}
      </span>
    </Tooltip>
  );
};
