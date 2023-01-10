import { Tooltip } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { currency, parseUnits, formatValue } from '@snx-v3/format';

export function Amount({
  value,
  prefix = '',
  suffix = '',
}: {
  prefix?: string;
  value: BigNumber;
  suffix?: string;
}) {
  const { formattedValue, isPrecise } = useMemo(() => {
    const parsedValue = parseUnits(value);
    const formattedValue = currency(formatValue(parsedValue));
    const cleanNumber = parseUnits(formattedValue.replaceAll(',', ''));
    return { formattedValue, isPrecise: parsedValue.eq(cleanNumber) };
  }, [value]);

  return (
    <Tooltip
      label={
        <>
          {prefix}
          {value.toString()}
          {suffix}
        </>
      }
      isDisabled={isPrecise}
    >
      <span>
        {prefix}
        {formattedValue}
        {suffix}
      </span>
    </Tooltip>
  );
}
